import {DOCUMENT_EVENTS} from "../constants";

export class LiveDocument {
  static async open(ctx: any, data: any) {
    const user = ctx.socket.user;

    const {usersWatching} = await ctx.documentRepository.get(data.documentId);

    if (!usersWatching.includes(user)) {
      await ctx.documentRepository.update(data.documentId, {
        usersWatching: [...usersWatching, user],
      });
    }

    ctx.io.broadcast(DOCUMENT_EVENTS.NEW_WATCHER, {
      user,
    });
  }

  static async close(ctx: any, data: any) {
    const user = ctx.socket.user;

    const {usersWatching} = await ctx.documentRepository.get(data.documentId);

    if (usersWatching.includes(user)) {
      await ctx.documentRepository.update(data.documentId, {
        usersWatching: usersWatching.filter((u: any) => u !== user),
      });
    }

    ctx.io.broadcast(DOCUMENT_EVENTS.WATCHER_LEAVE, {
      user,
    });
  }

  static async update(ctx: any, data: any) {
    await ctx.documentRepository.update(data.documentId, {
      body: data.body,
    });

    ctx.io.broadcast(DOCUMENT_EVENTS.DOCUMENT_UPDATE, {
      body: data.body,
    });
  }
}
