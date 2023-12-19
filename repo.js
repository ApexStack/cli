import { exec } from 'child_process';
import fs from 'fs'
import path from 'path';
import chalk from "chalk";
import { GITHUB_REPOS } from "./constant.js";
import { createSpinner } from 'nanospinner';
import { promisify } from 'util';
import { isParcelInstalled } from './utils.js';

const execPromise = promisify(exec);

export async function cloneRepository(tech, setup, folderPath, tailwind) {
    let repoName;

    if(tech.toLowerCase().includes('react')) {
        repoName = tailwind ? `${tech}-${setup}-tailwind` : `${tech}-${setup}`;
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
    
    const spinner = createSpinner(`Installing packages... \n`).start();

    try {
        const { stdout, stderr } = await execPromise(`git clone ${repoUrl} ${targetPath}`);
        const isParcelExist = await isParcelInstalled();
        if(!isParcelExist){
            await execPromise('npm i -g parcel');
        }
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
  