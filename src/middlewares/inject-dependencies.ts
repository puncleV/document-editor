import {IMiddleware} from "koa-router";
import {IDatabaseAdapter} from "../adapters/types";
import {MongodbAdapter} from "../adapters";
import {DocumentRepository} from "../repositories";
import {IAppContext} from "../typings";

let dbConnection: IDatabaseAdapter | null = null;
let documentsRepository: DocumentRepository;

// todo use container
// @ts-ignore
export const injectDependencies: IMiddleware = async (ctx: IAppContext, next) => {
  if (dbConnection == null) {
    dbConnection = await MongodbAdapter.create();
  }

  if (documentsRepository == null) {
    documentsRepository = new DocumentRepository({
      db: dbConnection,
    });
  }

  ctx.dbConnection = dbConnection;
  ctx.documentRepository = documentsRepository;

  await next();
};
