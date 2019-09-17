const fs = require('fs');

module.exports.type = 'get';
module.exports.params = '';
module.exports.func = async function (ctx, next) {
  ctx.type = 'text/html'
  var content = await readFile('./content.json');
  var temp = ctx.ip.split(":");
  var trigger = true;

  content = JSON.parse(content);
  content.ip.forEach(element => {
    if (element == temp[temp.length-1]) {
      trigger = false;
    }
  });

  if (trigger) {
    content.ip.push(temp[temp.length-1]);
    content.today++;
    content.total++;
    await writeFile('./content.json', JSON.stringify(content));
  }
  
  ctx.body = `{"today":${content.today}, "total":${content.total}}`;
}

async function readFile(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, (err, data) => {
      resolve(data);
    });
  })
}
async function writeFile(dir, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dir, data, (err)=>{
      resolve(true);
    });
  })
}