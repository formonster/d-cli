import childProcess from "child_process";

export const spawn = (
  command: string,
  args?: string[],
  options?: childProcess.SpawnOptionsWithoutStdio | undefined
) => {
  return new Promise((resolve, reject) => {
    const ls = childProcess.spawn(command, args, options);

    ls.stdout.on("data", (data) => {
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
