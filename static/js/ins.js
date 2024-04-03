const socket = io({autoConnect:false});
joinBtn = document.querySelector(".join")
chatArea = document.querySelector(".chat")
icons = {
    "icons1": "static/img/im1.png",
    "icons2": "static/img/im2.png",
    "icons3": "static/img/im3.png",

}
joinBtn.addEventListener("click" , ()=>{
    let username = document.getElementById("join-input").value
    chatArea.style.display = "flex"
    socket.connect()
    socket.on("connect" , ()=>{
        socket.emit("user_join" , username)
    })
})
sendBtn = document.getElementById("send_btn")
let messageInput = document.getElementById("message_user")
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let message = messageInput.value;
        socket.emit("new_message", message);
        messageInput.value = "";
    }
});

sendBtn.addEventListener("click" , ()=>{
    let message = document.getElementById("message_user").value
    socket.emit("new_message" , message )
    document.getElementById("message_user").value = ""
})
socket.on("chat" , (data)=>{
    let sms = document.getElementById("message_area")
    let p = document.createElement("p")
    let img = document.createElement("img")
    let iconKeys = Object.keys(icons);
    let randomIconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    let randomIconValue = icons[randomIconKey];
    img.src = randomIconValue

    p.appendChild(document.createTextNode( data["username"] + ": " + data["message"]))
    div = document.createElement("div")
    div.appendChild(img)
    div.appendChild(p)
    sms.appendChild(div)

    usersArea = document.querySelector(".users")
    pArea = document.createElement("p")
    let userExists = false;
    usersArea.childNodes.forEach(child => {
        if (child.innerText === data["username"]) {
            userExists = true;
            return;
        }
    });

    if (!userExists) {
        pArea.appendChild(document.createTextNode(data["username"]));
        usersArea.appendChild(pArea);
    }


    sms.scrolltop = sms.scrollHeight
})
