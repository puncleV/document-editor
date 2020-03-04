import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {helloRouter} from "./routes";

const app = new Koa();

app.use(bodyParser());

app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());

export const server = app;
