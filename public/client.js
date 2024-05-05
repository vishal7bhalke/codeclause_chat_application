// // Establishing a connection to the Socket.IO server
const socket = io();

// // Retrieving elements from the DOM
const sendbtn = document.getElementById("send");
const messageshow = document.getElementById("msg");
const getle = document.getElementById('getleft');
const getri = document.getElementById('getri');
const container= document.querySelector('.container');
var audio = new Audio("ting.mp3");


const append = (message,position) => {
    
    const msgelement=document.createElement('div');
    msgelement.innerText=message;
    msgelement.classList.add('message');
    msgelement.classList.add(position);
    container.appendChild(msgelement);
    if(position==='left'){
    audio.play(); }
}


socket.on('message', (message) => {
    append(`${message}  join the chat`,`right`);
});
const name=prompt("enter your name to join chat");
console.log(`${name}`)

socket.emit('newname',name);

// // Socket.IO Event Listener for incoming messages

// // Adding event listener to the send button
sendbtn.addEventListener('click', (e) => {
    // Preventing the default form submission behavior
    e.preventDefault();

    // Getting the message from the input field
    const msg = messageshow.value.trim(); // Trim to remove leading/trailing whitespace

    // Updating the right-side message display
    append(`you:${msg}`,`right`);

    // Emitting the message to the server with event name 'user-msg'
    socket.emit('user-msg', msg);

    // Clearing the input field after sending the message
    messageshow.value = '';
});
socket.on('recieveMsg', (message) => {
    append(`${message.name}:${message.message}`,`left`);
});
socket.on('left', (message) => {
    append(`${message}  left the chat`,`left`);
});