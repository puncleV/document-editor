import Router from 'koa-router';

const router = new Router({
  prefix: '/hello',
});

router.get('/', (ctx) => {
  ctx.body = 'world';
});

export const helloRouter = router;
