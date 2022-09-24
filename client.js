//establish
//<script  src="./valid.js"></script>
const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
var audio = new Audio('./ting.mp3')
const form = document.getElementById('send-cntnr');
const messageinput = document.getElementById('msg');
const msgcntnr = document.querySelector(".container");
//import { name1 } from 'valid.js';
const name1 = prompt("enter your name ! max size of name is 6");
socket.emit('new-users', name1);
const apend = (message, pos) => {
    //  console.log("append call");
    const msgelement = document.createElement('div');
    msgelement.innerText = message;
    msgelement.classList.add('message');
    msgelement.classList.add(pos);
    msgcntnr.append(msgelement);
    if (pos == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    apend(`You ${message}`, 'right')
    socket.emit('send', message);
    messageinput.value = '';
})
socket.on('user-joined', name => {
    apend(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    apend(`${data.name}:${data.message}`, 'left')
})

socket.on('left', nam => {
    apend(`${nam} left the chat`, 'left')
})