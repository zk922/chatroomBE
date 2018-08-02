import * as mongoose from "mongoose";
import {dbConfig} from "./config";

async function connectDb() {
  const dbUri = `mongodb://${dbConfig.username}:${dbConfig.pwd}@${dbConfig.url}:${dbConfig.port}/${dbConfig.dbname}`;

  let db = await mongoose.connect(dbUri);

}
export default connectDb;