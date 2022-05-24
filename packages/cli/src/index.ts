import { Command } from 'commander';
import create from '@d/create';

const program = new Command();

console.log('d cli')

program
  .command('create <app-name>')
  .description('创建一个新项目')
  .action((name, options) => {
    console.log('🐳 创建项目鸭');
    create(name, options);
  });

program.parse(process.argv);
