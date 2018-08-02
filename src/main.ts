import serverStart from "./app";
import connectDb from "./db";

async function start(){
  await connectDb();
  console.info('db connected');

  await serverStart();
}

start().catch(e => {
  console.log(e);
  process.exit(1);
});