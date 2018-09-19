var socket = io('/', {
    path: '/chat',
    query: {
        authorize: localStorage.getItem('token')
    }
});
socket.on('connect', function () {
    console.log('socket.io connected');
    var token = localStorage.getItem('token');
    if (token) {
        loginByToken(token);
    }
});
function loginByToken(token) {
    socket.emit('/api/loginByToken', { token: token });
}
