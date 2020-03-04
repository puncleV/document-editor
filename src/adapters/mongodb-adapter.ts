import {config} from "../config";
import {MongoClient, Db} from "mongodb";

export interface IMongodbAdapterDependencies {
  db: Db;
}

export class MongodbAdapter {
  private db: Db;

  constructor(dependencies: IMongodbAdapterDependencies) {
    this.db = dependencies.db;
  }

  async create() {
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

  getConnection() {
    return this.db;
  }
}
