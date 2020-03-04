import Koa from "koa";
import bodyParser from "koa-bodyparser";
import {helloRouter} from "./routes";
import {injectDependencies} from "./middlewares/inject-dependencies";

const app = new Koa();

app.use(bodyParser());

app.use(injectDependencies);
app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());

export const server = app;
