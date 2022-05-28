#!/usr/bin/env node
import { Command } from "commander";
import create from "@d/create";
import chalk from "chalk";
import packageJson from "../package.json";

const program = new Command();

program
  .command("create <app-name>")
  .description("创建一个新项目")
  .action((name, options) => {
    console.log(
      "🐳",
      chalk.yellow(packageJson.version),
      chalk.blue("欢迎使用 D-CLI!")
    );

    create(name, options);
  });

program.version(
  packageJson.version,
  "-v, --version",
  "output the current version"
);

program.parse(process.argv);
