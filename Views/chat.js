import chatController from "../Controllers/chatController.js";
import conversationController from "../Controllers/conversationController.js"
import {activeConversation, listenConversation} from "../Models/conversation.js"
import user from "../Models/user.js"
// import {subcribe} from "../Models/messages.js";


const ui =`    <div class="flex-container height-100">
            
<div class="element grow-1">
    <div id="js-conversationHeader">
    </div>
    <div id="js-conFrame">
    </div>
</div>            
<div class="flex-container flex-column grow-3">
    <div class="element">
        <h2>Title</h2>
    </div>
    <div class="flex-container element grow-1 vertical-scroll">
        <div class="element grow-3 flex-container flex-column">

            <div class="element grow-1 vertical-scroll" id="js-chatFrame">
                <div class="flex-container">
                    <span class="msg msg-guest">Hello, Chào anh!</span>
                </div>
                <div class="vertical-space"></div>   
                <div class="flex-container justify-end">
                    <span class="msg msg-host">Hello, Chào anh em nhớ!</span>
                </div>
                <div class="host-space"></div>
                <div class="flex-container justify-end">
                        <span class="msg msg-host">Hello, Chào anh em nhớ!</span>
                </div>
                    <div class="host-space"></div>
            </div>
            <div class="element">
                <form action="" id="js-formChat">
                    <div class="flex-container">

                        <div class="grow-1">
                            <input type="text" class="width-100" id="js-userInput">
                        </div>
                        <div>
                            <button>Send</button>
                        </div>                        
                    </div>
                </form>
        </div>
    </div>
    <div class="element grow-1">
       <div id="js-listUserFrame">
       </div>
        <div>
            <form id="js-formAddUser">
                <input type="text" placeholder="Type email here" id="js-inputAddUser">
            </form>
        </div>
    </div>
    </div>
</div>

</div>
`;

const formCreateHTML = `
<form id="js-formCreate">
    <div>
        <label>Name:</label>
        <input id="js-conName" type="text" class="width-100"/>
    </div>
    <div>
        <label>Email:</label>
        <input type="text" id="js-conEmail" class="width-100"/>
    </div>
    <div class="input-group">
    <button  class="btn btn-primary width-100" type="submit">Create</button>
    </div>
</form>
`
const btnShowHTML=`
    <button class=" btn btn-primary width-100" id="js-btnShow">Create new conversation</button>
`

function onLoad(){  
    // subscribe(chatSceen);
    const formChat = document.getElementById("js-formChat")
    const formAddUser = document.getElementById("js-formAddUser")
    const conFrame = document.getElementById("js-conFrame")

    conFrame.addEventListener("click", function(event){
        chatController.changeActiveIcon(event.target.id)
    })

    formChat.addEventListener("submit",function(event){
        event.preventDefault();
        chatController.sendMessages(formChat["js-userInput"].value)
        formChat["js-userInput"].value=""
    });
    formAddUser.addEventListener("submit",function(event){
        event.preventDefault();
        chatController.addUser(formAddUser["js-inputAddUser"].value)
        formAddUser["js-inputAddUser"].value=""
    });
    addBtnShow();
    listenConversation();
    
}

function addBtnShow(){
    const conHeader = document.getElementById("js-conversationHeader")
    conHeader.innerHTML=btnShowHTML;
    const btnShow = document.getElementById("js-btnShow");  
    btnShow.addEventListener("click", function(){
        addFormCreate();
    })
}

function addFormCreate(){
    const conHeader = document.getElementById("js-conversationHeader")
    conHeader.innerHTML = formCreateHTML;
    const formCreate = document.getElementById("js-formCreate")
    formCreate.addEventListener("submit", function(event){
        event.preventDefault();
        const name = formCreate["js-conName"].value;
        const email= formCreate["js-conEmail"].value;
        conversationController.createConversation(name,email)
        addBtnShow();
    })
}

function addMessage(message){
    const owner = message.user === user.autheUser.email ? "host" : "guest";
    const msg =`
    <div class="host-space"></div>
    <div class="flex-container ${owner === "host"?"justify-end" : ""}">
            <small>${message.user}</small>
            <br/>
            <span class="msg msg-${owner}">${message.content}</span>
        </div>`;
    const ChatFrame = document.getElementById("js-chatFrame");
    ChatFrame.insertAdjacentHTML("beforeend",msg); //chat liền kề
}

function addBulkMessages(messages){
    messages.forEach(function(msg){
        addMessage(msg);
    })
}

function addCon(conversation){
    console.log(conversation)
    const con=`
    <div id="${conversation.id}" class="chat-con-item ${conversation.id===activeConversation?"active" : null}">
       ${conversation.name}
    </div>
    `
    const conFrame = document.getElementById("js-conFrame")
    conFrame.insertAdjacentHTML("beforeend", con)
}

function updateUserList(listUser){
    console.log(listUser)
    const userListFrame = document.getElementById("js-listUserFrame");
    userListFrame.innerHTML = "";
    let listUserHtml ="";
    for (let i=0; i< listUser.length;i++){
        listUserHtml +=`
        <div>${listUser[i]}</div>
        `
    }
    userListFrame.insertAdjacentHTML("beforeend", listUserHtml);
}

function updateActiveCon(oldConId){
    if (oldConId !==null){
    const currentActiveCon = document.getElementById(oldConId)
    currentActiveCon.classList.remove("active")
    
    const nextActiveCon = document.getElementById(activeConversation)
    nextActiveCon.classList.add("active")
    }
} 

function clearMessages(){
    const chatFrame = document.getElementById("js-chatFrame")
    chatFrame.innerHTML=""
}

const chatScreen ={
    ui:ui,
    onLoad: onLoad,
    addMessage: addMessage,
    updateUserList: updateUserList,
    addCon:addCon,
    updateActiveCon: updateActiveCon,
    clearMessages: clearMessages,
    addBulkMessages: addBulkMessages
}
export default chatScreen;