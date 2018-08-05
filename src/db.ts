import * as mongoose from "mongoose";

/**
 * 连接数据库
 * dbConfig为数据库配置项
 * **/

async function connectDb(dbConfig) {
  const dbUri = `mongodb://${dbConfig.username}:${dbConfig.pwd}@${dbConfig.url}:${dbConfig.port}/${dbConfig.dbname}`;

  return await mongoose.connect(dbUri, dbConfig.options);

}
export default connectDb;