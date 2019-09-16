const fs = require('fs');
const urlencode = require('urlencode');

async function readFile(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, (err, data) => {
      resolve(data);
    });
  })
}

module.exports.type = 'post';
module.exports.params = ':id';
module.exports.func = async function (ctx, next) {
  ctx.type = 'text/html'
  ctx.body = await readFile(`../post/${urlencode.decode(ctx.params.id)}.md`);
}