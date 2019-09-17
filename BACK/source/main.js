const port = 4000;

const Koa = require('koa');
const Router = require('koa-router');
const KoaRouterExtreme = require('koa-router-extreme');
const cors = require('@koa/cors');

const app =  new Koa();
const router = new Router();
const koaRouterExtreme = new KoaRouterExtreme(router);

app.proxy = true;
app.use(cors());

koaRouterExtreme.injectToRouter(__dirname, 'api');

router.get('*', (ctx, next) => {
  ctx.body = '404 Not Found';
  ctx.response.status = 404;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, _ => {
  console.log(`\n# FUME engine is now started\nport - ${port}`);
});

const fs = require('fs')
const waitTime = 1000 * 60 // Updating time
var time = 0

function update () {
  var tempTime = new Date()
  tempTime = tempTime.getDate() + tempTime.getMonth()
  if (time !== tempTime) {
    time = tempTime
    fs.readFile('./content.json', (err, data)=>{
      data = JSON.parse(data);
      writeFile('./content.json', `{"today":0,"total":${data.total},"ip":[]}`);
    });
  } else setTimeout(_ => { update() }, waitTime)
}

function writeFile(dir, data) {
  fs.writeFile(dir, data, (err)=>{});
}

update()