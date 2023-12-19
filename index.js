#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { TECHS } from './constant.js';
import { cloneRepository } from './repo.js';

let folderPath;
let tech;
let setup;
let tailwind;

const sleep = (ms = 200) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.pulse(
    'Reactive Forge welcomes you!'
  );

  await sleep();
  rainbowTitle.stop();
}

async function chooseTechnology() {
  const technology = await inquirer.prompt({
    name: 'tech',
    type: 'list',
    message: 'Choose technology:',
    choices: [
      TECHS.REACT,
      TECHS.EXPRESS,
      TECHS.REACT_EXPRESS,
      TECHS.REACT_EXPRESS_MONGO_DB,
    ],
  });

  tech = technology.tech;
}

async function typeScript() {
  const choices = [
    { name: chalk.cyanBright('TypeScript'), value: 'TS' },
    { name: chalk.yellowBright('JavaScript'), value: 'JS' },
  ];

  const answers = await inquirer.prompt({
    name: 'setup',
    type: 'list',
    message: 'Choose setup:',
    choices: [
      chalk.cyanBright(`${choices[0].name}`),
      chalk.yellowBright(`${choices[1].name}`),
    ],
  });

  setup = choices.find(choice => answers.setup.includes(choice.name))?.value || '';
}

async function style() {
  const choices = [
    { name: chalk.cyanBright('TypeScript'), value: 'TS' },
    { name: chalk.yellowBright('JavaScript'), value: 'JS' },
  ];

  const answers = await inquirer.prompt({
    name: 'style',
    type: 'list',
    message: 'Tailwind CSS:',
    choices: [
      'Yes',
      'No'
    ],
  });

  tailwind = answers.style === 'Yes' ? true : false;
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

async function packageInstaller() {
    if(!folderName || !tech || !folderPath){    
        console.log(chalk.redBright(`Something went wrong!!`)); 
        process.exit(1);
    }

    await cloneRepository(tech, setup, folderPath, tailwind);

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
if(tech.toLowerCase().includes('react')) {
  await style();
}
await folderName();
await packageInstaller();