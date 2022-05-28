import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import { shellUtil } from "@d/util";
import fs from "fs";
import projectInfo from "./projects.json";

type ProjectTypeKeys = keyof typeof projectInfo;

async function create(projectName: string, options: any) {
  const cwd = options.cwd || process.cwd();
  const targetDir = path.resolve(cwd, projectName || ".");

  if (fs.existsSync(targetDir)) {
    console.log("❌", chalk.red("目录已存在！"));
    process.exit(1);
  }

  console.log("");
  console.log("🐳", chalk.gray("您的项目名："), chalk.yellow(projectName));
  console.log("");

  const type = await selectProject();
  await createProject(projectName, type);
}

async function selectProject(): Promise<ProjectTypeKeys> {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: `请你选择需要的项目:`,
      choices: [
        ...Object.keys(projectInfo).map((item) => ({
          name: item,
          value: item,
        })),
      ],
    },
  ]);

  return action;
}

async function createProject(projectName: string, type: ProjectTypeKeys) {
  const currentProjectInfo = projectInfo[type];

  await shellUtil.spawn("git", [
    "clone",
    "-b",
    currentProjectInfo.branch,
    currentProjectInfo.repo,
    projectName,
  ]);
  await shellUtil.spawn("rm", ["-rf", `./${projectName}/.git`]);

  console.log(chalk.green(`初始化${projectName}项目成功`));
}

export default create;
