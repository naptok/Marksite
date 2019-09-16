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
  console.log(`\n# Backend Service ON\nport - ${port}`);
});