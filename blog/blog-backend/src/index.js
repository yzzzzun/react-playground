const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'home';
});

router.get('/about/:name', ctx => {
  const { name } = ctx.params;
  ctx.body = name ? `about ${name}` : 'about';
});

router.get('/posts', ctx => {
  const { id } = ctx.query;
  ctx.body = id ? `post #${id}]` : 'post id 없음';
});
app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);

//   if (ctx.query.authorized !== '1') {
//     ctx.status = 401;
//     return;
//   }
//   await next();
//   console.log('END');
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use(ctx => {
//   ctx.body = 'hello world';
// });

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
