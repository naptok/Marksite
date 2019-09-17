const fs = require('fs');
const urlencode = require('urlencode');
const request = require('request');

module.exports.type = 'get';
module.exports.params = ':id';
module.exports.func = async function (ctx, next) {
  ctx.type = 'text/html'
  ctx.body = await readFile(`./post/${urlencode.decode(ctx.params.id)}.md`);
}

async function readFile(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, (err, data) => {
      resolve(data);
    });
  })
}