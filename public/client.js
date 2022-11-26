const socket=io()
const textarea=document.querySelector('#textarea');
const messageArea=document.querySelector('.message__area')
let name;
do{
    name=prompt("Enter your name:")
}while(!name)


textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
})



// function for send msg.

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }

    // append 
    appendMessage(msg,'outgoing');
    textarea.value=''
    scrollUp()
    // send to server
    socket.emit('message',msg)
}

// function for append msg.
function appendMessage(msg,type){

    let mainDiv=document.createElement('div')
    let className=type;

    mainDiv.classList.add(className ,'message');

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup

    messageArea.appendChild(mainDiv)
}

// Recieve message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollUp()
})

// scroll up 
function scrollUp(){
    messageArea.scrollTop=messageArea.scrollHeight
}