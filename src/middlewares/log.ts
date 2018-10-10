import * as fs from 'fs';
import {WriteStream} from "fs";
import {Context} from "koa";
/**
 * 自己简单实现的http请求日志，但是该日志无法监控socket.io在使用websocket时候的日志
 * 若要监测，需要另外实现
 * **/
function logFileName(): string {//获取当前最新的日志文件名，文件名按照2018-7-6格式
  return new Date().toLocaleDateString().replace('/', '-') + '.log';
}

function errLogFileName(): string {//获取当前最新的错误日志文件名
  return 'err-' + logFileName()
}

function formatTime(date: Date): string {
  return date.toString().replace(' GMT+0800 (中国标准时间)', '');
}

function formatLog(ctx: Context, startTime: Date): string{

  let log = `${formatTime(startTime)}\n`;

  log += `  <--  ${ctx.method}  ${ctx.ip}  ${ctx.originalUrl}\n`;

  const endTime = new Date();

  log += `  -->  ${ctx.status + ' ' + ctx.message}  ${(<any>endTime - <any>startTime) + 'ms'}  ${ctx.length ? (ctx.length/1024).toFixed(2)+' KB' : ''}\n`;

  log += `===========================================================================\n`;

  return log;
}

function formatErrLog(ctx: Context, err: Error, startTime: Date): string {

  let log = `${formatTime(startTime)}\n`;

  log += `  <--  ${ctx.method}  ${ctx.ip}  ${ctx.originalUrl}\n`;

  const endTime = new Date();

  log += `  -->  ${ctx.status + ' ' + ctx.message}  ${(<any>endTime - <any>startTime) + 'ms'}  ${ctx.length ? (ctx.length/1024).toFixed(2)+' KB' : ''}\n`;

  log += `  err name: ${err.name}\n`;

  log += `  err message: ${err.message}\n`;

  log += `  err stack: ${err.stack}\n`;

  log += `===========================================================================\n`;

  return log;

}

export function logger(config){
  const logDirPath = config.logDir;
  const errLogDirPath = config.errLogDir;
  console.log('日志路径：', logDirPath);
  console.log('错误日志路径：', errLogDirPath);


  if(!fs.existsSync(logDirPath)){
    fs.mkdirSync(logDirPath);
  }
  let nowLogFileName = logFileName();
  console.log('当前日志文件名', nowLogFileName);
  let logStream: WriteStream = createLogStream();
  if(!fs.existsSync(errLogDirPath)){
    fs.mkdirSync(errLogDirPath);
  }
  let nowErrLogFileName = errLogFileName();
  console.log('当前错误日志文件名', nowErrLogFileName);
  let errLogStream: WriteStream = createErrLogStream();

  function createLogStream(): WriteStream{
    return fs.createWriteStream(logDirPath + '/' + nowLogFileName, {flags: 'a'});
  }

  function createErrLogStream() {
    return fs.createWriteStream(errLogDirPath + '/' + nowErrLogFileName, {flags: 'a'});
  }
  async function checkLogStream(): Promise<WriteStream> {
    let newLogFileName = logFileName();
    return new Promise(resolve => {
      if(newLogFileName === nowLogFileName){
        resolve(logStream);
      }
      else{
        logStream && logStream.end('____ended____');
        logStream.on('finish', ()=>{
          nowLogFileName = newLogFileName;
          logStream = createLogStream();
          resolve(logStream);
        });
      }
    }) as Promise<WriteStream>;
  }

  async function checkErrLogStream(): Promise<WriteStream> {
    let newErrLogFileName = errLogFileName();
    return new Promise(resolve => {
      if(newErrLogFileName === nowErrLogFileName){
        resolve(errLogStream);
      }
      else{
        errLogStream && errLogStream.end('____ended____');
        errLogStream.on('finish', ()=>{
          nowErrLogFileName = newErrLogFileName;
          errLogStream = createErrLogStream();
          resolve(errLogStream);
        });
      }
    }) as Promise<WriteStream>;
  }


  return async function(ctx: Context, next) {
    let startTime = new Date();
    try{
      await next();
      if(ctx.status >= 400){
        ctx.throw(ctx,status);
      }
      let logStream = await checkLogStream();
      logStream.write(formatLog(ctx, startTime));
    }
    catch (e) {
      let errLogStream = await checkErrLogStream();
      errLogStream.write(formatErrLog(ctx, e, startTime));
    }
  }
}



export default logger;