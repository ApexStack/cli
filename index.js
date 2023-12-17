#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { technologies } from './constant.js';
import { cloneRepository } from './repo.js';

let folderPath;
let tech;
let setup;

const sleep = (ms = 200) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.pulse(
    'Reactive Forge welcomes you!'
  );

  await sleep();
  rainbowTitle.stop();
}

async function folderName() {
  const answers = await inquirer.prompt({
    name: 'path',
    type: 'input',
    message: 'folder name?',
    default() {
      return `my-app`;
    },
  });

  folderPath = answers.path || 'my-app';
}

async function chooseTechnology() {
    const technology = await inquirer.prompt({
      name: 'tech',
      type: 'list',
      message: 'Choose technology:',
      choices: [
        technologies.REACT,
        technologies.EXPRESS,
        technologies.REACT_EXPRESS,
        technologies.REACT_EXPRESS_MONGO_DB,
      ],
    });

    tech = technology.tech;
}

async function typeScript() {
    const answers = await inquirer.prompt({
      name: 'setup',
      type: 'list',
      message: 'Choose setup:',
      choices: [
        chalk.cyanBright(`TypeScript`),
        chalk.yellowBright('Vanila JS'),
      ],
    });

    setup = answers.setup;
}


async function packageInstaller() {
    if(!folderName || !tech || !folderPath){    
        console.log(chalk.redBright(`Something went wrong!!`)); 
        process.exit(1);
    }

    await cloneRepository(tech, setup, folderPath);

    figlet(`Reactive Forge`, (err, data) => {
      console.log(gradient.morning(data) + '\n');
  
      console.log(
        chalk.whiteBright(
          `Reactive forge welcomes you! Happy programming!`
        )
      );
  
      process.exit(0);
    });
}


console.clear();
await welcome();
await chooseTechnology();
await typeScript();
await folderName();
await packageInstaller();