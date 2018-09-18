/**
 * 这里需要简单的自己实现socket.io基于event的路由
 * **/
import {ioServerInterfaces} from "./interfaces";
import EnhancedMiddleware = ioServerInterfaces.EnhancedMiddleware;
import RouterPacket = ioServerInterfaces.RouterPacket;
import RouterMiddleware = ioServerInterfaces.RouterMiddleware;
import EnhancedPacket = ioServerInterfaces.EnhancedPacket;

export class IoRouter {

  constructor(){}


  /**
   * 根据添加的路由中间件，返回io service使用的中间件
   * **/
  public routes(): EnhancedMiddleware{
    return (packet: EnhancedPacket, next: (err?: any) => void)=>{
      let n;
      this.mwList.forEach((v, i)=>{
        let path = packet.packet[0];
        //进行path/event路径匹配
        if(v.reg.test(path)){
          //解析参数
          let data = {};
          let values = path.match(v.reg).slice(1);
          v.keys.forEach((v,i)=>{
            data[v] = values[i];
          });
          //传入扩展后的路由中间件
          //注：这里没有更改this指向
          let routerPacket: RouterPacket = Object.assign({data: data, path: path}, packet);
          n = v.mw(routerPacket, next);
        }
      });
      return n;
    };
  }

  private mwList: {path: string, mw: RouterMiddleware, reg: RegExp, keys: string[]}[] = [];
  /**
   * 添加路由中间件，path实际就是socket.io的自定义event
   * @param path: string
   * @param middleware: RouterMiddleware
   * **/
  public use(path: string, middleware: RouterMiddleware): IoRouter{
    this.mwList.push(Object.assign({
      path: path,
      mw: middleware
    }, this.getPathRegAndKeys(path)));
    return this;
  }

  /**
   * 通过use添加io中间件时，生成path解析正则与参数列表
   * 本例子中的参数简单参数都是直接添加在路径中，比如'/path1/:id/:name',key为id与name
   * @param path: string       中间件对应的路径
   * **/
  private getPathRegAndKeys(path: string): {keys: string[], reg: RegExp}{
    let pathSegments = path.replace(' ', '').split('/').filter(v=>v!=='');
    let regStr = '^[/\\\\]?';
    let keys = [];
    pathSegments.forEach(v => {
      if(/^:\w+$/.test(v)){
        regStr += '(\\w+)[/\\\\]';
        keys.push(v.slice(1));
      }
      else{
        regStr += (v + '[/\\\\]');
      }
    });
    regStr += '?$';
    return {
      keys: keys,
      reg: new RegExp(regStr)
    };
  }
}
export default IoRouter;