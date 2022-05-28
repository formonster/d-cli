import childProcess from "child_process";

interface SpawnOptions extends childProcess.SpawnOptionsWithoutStdio {
  showLog?: boolean;
}

export const spawn = (
  command: string,
  args?: string[],
  options?: SpawnOptions | undefined
) => {
  return new Promise((resolve, reject) => {
    const ls = childProcess.spawn(command, args, options);

    ls.stdout.on("data", (data) => {
      if (options?.showLog || options?.showLog === undefined)
        console.log(`${data}`);
    });

    ls.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    ls.on("close", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });

    ls.on("error", (err) => {
      reject(err);
    });
  });
};
