import Router from "koa-router";
import {IAppContext} from "../typings";

const router = new Router({
  prefix: "/documents",
});

// @ts-ignore
router.get("/", async (ctx: IAppContext) => {
  // @ts-ignore
  ctx.body = await ctx.documentRepository.find(ctx.request.query);
});

// @ts-ignore
router.get("/:documentId", async (ctx: IAppContext) => {
  // @ts-ignore
  ctx.body = await ctx.documentRepository.get(ctx.params.documentId);
});

// @ts-ignore
router.delete("/:documentId", async (ctx: IAppContext) => {
  // @ts-ignore
  ctx.body = await ctx.documentRepository.delete(ctx.params.documentId);
});

// @ts-ignore
router.post("/", async (ctx: IAppContext) => {
  ctx.body = await ctx.documentRepository.create(ctx.request.body);
});

// @ts-ignore
router.put("/:documentId", async (ctx: IAppContext) => {
  // @ts-ignore
  ctx.body = await ctx.documentRepository.update(ctx.params.documentId, ctx.request.body);
});

export const helloRouter = router;
