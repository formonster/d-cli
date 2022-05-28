import childProcess from "child_process";

export const spawn = (
  command: string,
  options?: childProcess.SpawnOptionsWithoutStdio | string[] | undefined
) => {
  return new Promise((resolve, reject) => {
    const ls = childProcess.spawn(
      command,
      options as childProcess.SpawnOptionsWithoutStdio
    );

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
