const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const posts = require('./api/posts');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
router.use('/api/posts', posts.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
