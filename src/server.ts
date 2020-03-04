import Koa from "koa";
import bodyParser from "koa-bodyparser";
import {helloRouter} from "./routes";
import {injectDependencies} from "./middlewares/inject-dependencies";
// @ts-ignore
import Socket from "koa-socket-2";
import {LiveDocument} from "./service/live-document";

const app = new Koa();
const io = new Socket();

io.attach(app);

app.use(bodyParser());

// @ts-ignore
io.on("connect", (ctx) => {
  // todo add real session taken from koa context, etc.
  // tslint:disable-next-line: no-bitwise
  ctx.user = ~~(Math.random() * 1000);
  // ctx.io = io;
});

io.use(injectDependencies);
// @ts-ignore
io.use(async (ctx, next) => {
  ctx.io = io;

  await next();
});

// @ts-ignore
io.on("open", LiveDocument.open);
io.on("close", LiveDocument.close);

app.use(injectDependencies);
app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());

export const server = app;
