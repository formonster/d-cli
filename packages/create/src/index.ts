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
  console.log("🐳", chalk.gray("您的项目名:"), chalk.yellow(projectName));
  console.log("");

  const type = await selectProject();
  await createProject(projectName, type);
  await initDependency(projectName);
}

async function selectProject(): Promise<ProjectTypeKeys> {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: `请你选择需要的项目:`,
      choices: Object.keys(projectInfo).map((item) => ({
        name: item,
        value: item,
      })),
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

  await shellUtil.spawn("git", ["init"], {
    cwd: `${process.cwd()}/${projectName}`,
    showLog: false,
  });

  await shellUtil.spawn("git", ["add", "."], {
    cwd: `${process.cwd()}/${projectName}`,
    showLog: false,
  });

  await shellUtil.spawn("git", ["commit", "-m", "first commit"], {
    cwd: `${process.cwd()}/${projectName}`,
    showLog: false,
  });

  await shellUtil.spawn("git", ["branch", "-M", "main"], {
    cwd: `${process.cwd()}/${projectName}`,
    showLog: false,
  });
}

async function initDependency(projectName: string) {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: `请你选择包管理工具:`,
      choices: ["pnpm", "yarn", "npm"].map((item) => ({
        name: item,
        value: item,
      })),
    },
  ]);

  await shellUtil.spawn(action, ["install"], {
    cwd: `${process.cwd()}/${projectName}`,
  });

  console.log(
    "\n🐳",
    chalk.yellowBright(projectName),
    chalk.green(`初始化完成`)
  );

  console.log("\n🐳", chalk.yellowBright("$"), chalk.gray(`cd ${projectName}`));
  console.log("\n🐳", chalk.yellowBright("$"), chalk.gray("yarn dev"));
  console.log();
}

export default create;
