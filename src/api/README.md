# router的结构说明

middlewares文件夹为所有socket.io接口的中间件。

本socket.io聊天室，只有开始的静态页加载是通过http获取的。前端页面加载完成，socket.io链接建立好后，后面所有前后交互都是通过socket.io建立的socket进行通讯的。

所有功能模块，均使用socket.use()挂载为socket中间件（详见socket.io文档）。

接口路由使用socket的event的名称作为路由的path，并自己简单封装了一个路由类（../models/IoRouter.ts）