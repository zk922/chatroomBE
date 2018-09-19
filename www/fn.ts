

let socket: SocketIOClient.Socket = io('/', {
  path: '/chat',
  query: {
    authorize: localStorage.getItem('token')
  }
});

socket.on('connect', function () {
  console.log('socket.io connected');
  let token = localStorage.getItem('token');
  if(token){
    loginByToken(token);
  }
});

function loginByToken(token: string){
  socket.emit('/api/loginByToken', {token: token})

}