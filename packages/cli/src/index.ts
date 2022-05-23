import { Command } from 'commander';
import chalk from 'chalk';
import create from '@d/create';

const program = new Command();

program
  .command('create <app-name>')
  .description('创建一个新项目')
  .action((name, options) => {
    create(name, options);
  });

program.parse(process.argv);
