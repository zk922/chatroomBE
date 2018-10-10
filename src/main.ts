import connectDb from "./db";



async function start(){
  await connectDb();            //链接数据库
  console.log('db connected');
  import('./app');              //启动服务器
}

start().catch(e => {
  console.log(e);
  process.exit(1);
});