import _ from "lodash";

import {IDatabaseAdapter} from "../adapters/types";
import {IDocument} from "./types";
import {ObjectID} from "mongodb";

export interface IDocumentRepositoryDependencies {
  db: IDatabaseAdapter;
}

// todo add interface
export class DocumentRepository {
  private connection: any;
  // todo something better
  private collectionName: string;

  constructor(dependencies: IDocumentRepositoryDependencies) {
    this.connection = dependencies.db.getConnection();
    this.collectionName = "documents";
  }

  // todo add validation (mongoose, or joi lib)
  async create(document: Omit<IDocument, "body">) {
    // todo this is probably adapter thing but it's not that important for now
    const {insertedId} = await this.connection.collection(this.collectionName).insertOne({
      ...document,
      body: "",
      usersWatching: [],
    });

    return {
      id: insertedId,
      ...document,
    };
  }

  async update(documentId: string, document: Pick<IDocument, "title">) {
    const {
      result: {ok},
    } = await this.connection
      .collection(this.collectionName)
      .updateOne({_id: ObjectID.createFromHexString(documentId)}, {$set: document});

    if (ok === 1) {
      return await this.get(documentId);
    }

    throw new Error(`Can't find document with id '${documentId}'`);
  }

  async delete(documentId: string) {
    const {deletedCount} = await this.connection
      .collection(this.collectionName)
      .deleteOne({_id: ObjectID.createFromHexString(documentId)});

    if (deletedCount === 1) {
      return {};
    }

    throw new Error(`Can't find document with id '${documentId}'`);
  }

  async get(documentId: string) {
    const document = await this.connection
      .collection(this.collectionName)
      .findOne({_id: ObjectID.createFromHexString(documentId)});

    return _.omit(
      {
        ...document,
        id: document._id,
      },
      "_id",
    );
  }

  async find(document: IDocument) {
    return (await (await this.connection.collection(this.collectionName).find(document || {})).toArray()).map(
      (d: any) =>
        _.omit(
          {
            ...d,
            id: d._id,
          },
          "_id",
        ),
    );
  }
}
