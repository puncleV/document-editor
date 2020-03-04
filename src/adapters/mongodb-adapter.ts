import {config} from "../config";
import {MongoClient, Db} from "mongodb";
import {IDatabaseAdapter} from "./types";

export interface IMongodbAdapterDependencies {
  db: Db;
}

export class MongodbAdapter implements IDatabaseAdapter {
  private db: Db;

  constructor(dependencies: IMongodbAdapterDependencies) {
    this.db = dependencies.db;
  }

  static async create(): Promise<MongodbAdapter> {
    return new Promise((resolve, reject) =>
      MongoClient.connect(config.db.url, (err, client) => {
        if (err != null) {
          reject(err);
          return;
        }

        resolve(new MongodbAdapter({db: client.db(config.db.name)}));
      }),
    );
  }

  public getConnection() {
    return this.db;
  }
}
