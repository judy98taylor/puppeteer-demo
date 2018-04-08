#!/usr/bin/env node

require("shelljs/global");
let sourceProjectName = process.cwd().split("/")[
  process.cwd().split("/").length - 1
];
let commonPath = process.cwd().replace(sourceProjectName, "");
let destProjectName = "asd";
console.log(commonPath)

// let sourceDistPath = "puppeteer-demo";
// let destDistPath = "asd";
console.log(process.cwd())

if (!which("git")) {
  echo("Sorry, this script requires git");
  exit(1);
}
let who = exec("git config user.name", {
  silent: true
}).stdout;
let sourceRemoteUrl = exec("git config remote.origin.url", {
    silent: true
  })
  .stdout;

// build完成之后 应该只更新dist
// 这个应该放在build之前 记录
// exec(
//   `
// git status
// git add -A
// git commit -m 'test build -save'
// git pull
// git push
// `,
//   { silent: true }
// );
// console.log("gst");


//start

exec(
  `
zip -qr dist.zip ./dist
`, {
    silent: true
  }
)
console.log('zip dist done')
//
cd(`${commonPath}${destProjectName}/`)
exec(
  `
git reset --hard
git checkout -b dev
git checkout dev
`, {
    silent: true
  }
)
console.log('gco dev done')
console.log(process.cwd())
//
cp(
  `${commonPath}${sourceProjectName}/dist.zip`,
  `${commonPath}${destProjectName}/${destDistPath}`
)
console.log('cp dist done')

rm('-rf', `${commonPath}${sourceProjectName}/dist.zip`)
console.log('del sourceProjectName dist.zip done')

exec(
  `
unzip -fo ${commonPath}${destProjectName}/${destDistPath}dist.zip
`, {
    silent: true
  }
)
console.log('unzip dist done')

rm('-rf', `${commonPath}${destProjectName}/${destDistPath}dist.zip`)
console.log('del destProjectName dist.zip done')

//
exec(
  `
git status
git add -A
`, {
    silent: true
  }
);
// git commit -m 'update test code from ${who}'
// git pull
// git push
console.log("push done");
// test.js