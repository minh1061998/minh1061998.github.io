import user from "./user.js";
import {activeConversation} from "./conversation.js"
import chatScreen from "../Views/chat.js"


let unsubcribe = null

function subcribe(){
    return db.collection("messages").where("conversation","==", activeConversation)
    .orderBy("created_at")
    .onSnapshot(function(snapshot){
        const messages = snapshot.docChanges();
        for (let i =0; i < messages.length; i++){
            if (messages[i].type === "added")
        chatScreen.addMessage(messages[i].doc.data());
        }
    });
}

function newMessages(content) {
    return{
        content: content,
        user: user.autheUser.email,
        conversation: activeConversation
    };
}

function saveMessages(messages){
    db.collection("messages")
    .doc()
    .set({
        ...messages,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(){
        console.log("Message sent: ");
    })
    .catch(function (err){
        console.error("Failed to send message: ",err);
    });
}

function changeActiveCon(){
    
    if(unsubcribe !== null){
        unsubcribe()
    }
    chatScreen.clearMessages()
    unsubcribe = subcribe()
}

export  {newMessages, saveMessages, changeActiveCon}