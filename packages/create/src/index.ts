import chalk from 'chalk';

function create(name: string, options: any) {
  console.log('test', chalk.yellow(name, JSON.stringify(options)));
}

export default create
