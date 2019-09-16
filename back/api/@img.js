const fs = require('fs');

async function readFile(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, (err, data) => { resolve(data); });
  })
}

module.exports.type = 'get';
module.exports.params = ':id'
module.exports.func = async (ctx, next) => {
  ctx.type = 'image/png'
  ctx.body = await readFile(`../img/${ctx.params.id}`)
};