/**
 * 这里需要简单的自己实现socket.io基于event的路由
 * **/
import {ioServerInterfaces} from "./interfaces";
import EnhancedMiddleware = ioServerInterfaces.EnhancedMiddleware;
import RouterPacket = ioServerInterfaces.RouterPacket;
import RouterMiddleware = ioServerInterfaces.RouterMiddleware;
import EnhancedPacket = ioServerInterfaces.EnhancedPacket;




export class IoRouter {

  constructor(){

  }

  public routes(): EnhancedMiddleware{

    //TODO developing
    return (packet: EnhancedPacket, next: (err?: any) => void)=>{
      this.mwList.forEach((v, i)=>{

      });
    };
  }


  private mwList: {path: string, mw: RouterMiddleware}[] = [];

  public use(path: string, middleware: RouterMiddleware): IoRouter{
    this.mwList.push({
      path: path,
      mw: middleware
    });
    return this;
  }

  private parsePath(){

  }

  private getPathReg(path: string): RegExp{
    let pathSegments = path.replace(' ', '').split('/').filter(v=>v!=='');
    let regStr = '';
    //TODO
    return /\d/

  }

}
export default IoRouter;