import serverStart from "./app";
import connectDb from "./db";

async function start(){
  await connectDb();
  serverStart();
}

start();