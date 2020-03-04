import {ExtendableContext} from "koa";
import {DocumentRepository} from "./repositories";

export interface IAppContext extends ExtendableContext {
  dbConnection: any;
  documentRepository: DocumentRepository;
  params: any;
  io: any;
}
