import { readdirSync } from "fs";

function getFiles(dir: string) {
  const files = readdirSync(dir, {
    withFileTypes: true,
  });

  // Array with the files.
  let allFiles: [string, string][] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      allFiles = [...allFiles, ...getFiles(`${dir}/${file.name}`)];
    } else if (
      file.name.endsWith(
        ".js" || file.name.endsWith(".ts") || !file.name.endsWith("d.ts")
      )
    ) {
      // Getting the file name.
      let fileName: string | string[] = file.name
        .replace(/\\/g, "/")
        .split("/");

      fileName = fileName[fileName.length - 1];
      fileName = fileName.split(".")[0].toLowerCase();

      allFiles.push([`${dir}/${file.name}`, fileName]);
    }
  }
  return allFiles;
}

export = getFiles;
