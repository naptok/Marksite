const fs = require('fs');

module.exports.type = 'get';
module.exports.func = async (ctx, next) => {
  console.log('received')
  postList = [];
  ctx.type = 'text/html'
  ctx.body = await readDir('./post');
}

var postList = [];

async function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, async (err, files) => {
      for (var i = 0; i < files.length; i++) {
        if (files[i].substring(files[i].length-3) == '.md') {
          var file_link = files[i].substring(0, files[i].length-3);
          await readStat(dir + '/' + files[i], file_link)
        }
      }
      console.log(postList)
      resolve(JSON.stringify(postList));
    });
  });
}


async function readStat(dir, file_link) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stat) => {
      console.log(file_link)
      postList.push({ file: file_link, time: stat.mtime});
      resolve(true);
    });
  });
}