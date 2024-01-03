import { exec } from 'child_process';
import fs from 'fs'
import path from 'path';
import chalk from "chalk";
import { GITHUB_REPOS, MAKEFILE_CONTENT } from "./constant.js";
import { createSpinner } from 'nanospinner';
import { promisify } from 'util';
import { isParcelInstalled, removeGitRemote } from './utils.js';

const execPromise = promisify(exec);

export async function cloneRepository(tech, setup, folderPath, tailwind, isFunction) {
    let repoName;

    const lowerTech = tech.toLowerCase();

    if(lowerTech.includes('react') && lowerTech.includes('express')) {
        const repoName1 = tailwind ? `React-${setup}-tailwind` : `React-${setup}`;
        const repoName2 = `Express-${setup}-${isFunction}`;

        const reactUrl = GITHUB_REPOS[repoName1];
        const expressUrl = GITHUB_REPOS[repoName2];
        
        await installMultipleRepo({ reactUrl, expressUrl, folderPath });
        process.exit(1);
    } else if (lowerTech.includes('react')) {
        repoName = tailwind ? `${tech}-${setup}-tailwind` : `${tech}-${setup}`;
    } else if(lowerTech.includes('express')) {
        repoName = `${tech}-${setup}-${isFunction}`;
    }

    let repoUrl = GITHUB_REPOS[repoName];
    
    if(!repoUrl) {    
        console.log(chalk.redBright(`Something went wrong!!`)); 
        process.exit(1);
    }

    let targetPath; 
    if ( folderPath === '.' || folderPath === './' ) {
        targetPath = process.cwd();
    } else {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        targetPath = path.resolve(process.cwd(), folderPath);
    }
    
    await installSingleRepo({ repoUrl, targetPath });
}
  
async function installSingleRepo({ repoUrl, targetPath }) {
    const spinner = createSpinner(`Installing packages... \n`).start();
    try {
        const { stdout, stderr } = await execPromise(`git clone ${repoUrl} ${targetPath}`);
        const isParcelExist = await isParcelInstalled();
        if(!isParcelExist){
            await execPromise('npm i -g parcel');
        }
        await removeGitRemote(targetPath);
        spinner.success({ text: 'Successfully installed!' });
    } catch (err) {
        const messages = err.message.split(': ');
        let message;
        if(err.code === 128) {
            message = messages.pop();
        }
        
        spinner.error({ text: message });
        process.exit(1);
    }
}

async function installMultipleRepo({ reactUrl, expressUrl, folderPath }) {
    const spinner = createSpinner(`Installing packages... \n`).start();
    try {
        const isParcelExist = await isParcelInstalled();
        if(!isParcelExist){
            await execPromise('npm i -g parcel');
        }

        let targetPath; 
        if ( folderPath === '.' || folderPath === './' ) {
            targetPath = process.cwd();
            await execPromise(`mkdir client server`);
        } else {
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            targetPath = path.resolve(process.cwd(), folderPath);
            await execPromise(`cd ${targetPath} && mkdir client server`);
        }
        await execPromise(`cd ${targetPath}/client && git clone ${reactUrl} ./`);
        await execPromise(`cd ${targetPath}/server && git clone ${expressUrl} ./`);

        await execPromise(`echo "${MAKEFILE_CONTENT}" > ${targetPath}/Makefile`);

        await removeGitRemote(`${targetPath}/client`);
        await removeGitRemote(`${targetPath}/server`);
        spinner.success({ text: 'Successfully installed!' });
    } catch (err) {
        const messages = err.message.split(': ');
        let message;
        if(err.code === 128) {
            message = messages.pop();
        }
        
        spinner.error({ text: message });
        process.exit(1);
    }
}