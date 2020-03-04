import Router from "koa-router";
import {IAppContext} from "../typings";
import {DOCUMENT_EVENTS} from "../constants";

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

  ctx.io.broadcast(DOCUMENT_EVENTS.DELETE, {
    documentId: ctx.params.documentId,
  });
});

// @ts-ignore
router.post("/", async (ctx: IAppContext) => {
  ctx.body = await ctx.documentRepository.create(ctx.request.body);

  ctx.io.broadcast(DOCUMENT_EVENTS.NEW_DOCUMENT, {
    ...ctx.body,
  });
});

// @ts-ignore
router.put("/:documentId", async (ctx: IAppContext) => {
  // @ts-ignore
  ctx.body = await ctx.documentRepository.update(ctx.params.documentId, ctx.request.body);

  ctx.io.broadcast(DOCUMENT_EVENTS.DOCUMENT_UPDATE, {
    ...ctx.body,
  });
});

export const helloRouter = router;
