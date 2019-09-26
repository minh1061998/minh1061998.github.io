import chatScreen from "../Views/chat.js";
import user from "./user.js";

let activeConversation = null;
const addedConversations = []
function listenConversation(){

    db.collection("conversations").where("list_users","array-contains", user.autheUser.email).onSnapshot(function(snapshot){
        const conversations = snapshot.docChanges();
        for (let i =0; i < conversations.length; i++){
            const con = conversations[i].doc.data()
            if(conversations[i].type==="added" 
            || (conversations[i].type === "modified" && addedConversations.indexOf(conversations[i].doc.id) <0)){
                const con = conversations[i].doc.data()
                con.id = conversations[i].doc.id
                addedConversations.push(con.id)
                chatScreen.addCon(con)
            }
            if(conversations[i].type === "modified" && conversations[i].doc.id === activeConversation){
                chatScreen.updateUserList(con.list_users)
            }
        }
    });
}


function addUser(email){
    db.collection ('conversations').doc(activeConversation).update({
        list_users: firebase.firestore.FieldValue.arrayUnion(email)
    })
}

function saveConversation(name, email){
    db.collection("conversations")
    .doc()
    .set({
        name: name,
        list_users: [user.autheUser.email, email]
    })
    .then(function(){
        console.log("Conversation created ");
    })
    .catch(function (err){
        console.error("Failed to create conversation: ",err);
    });
}

function updateActiveCon(nextConId){
    const oldCon = activeConversation
    activeConversation = nextConId;
    chatScreen.updateActiveCon(oldCon)
    updateListUser(activeConversation)
}

function updateListUser(conId){
    db.collection("conversations").doc(conId).get()
    .then(function(snapshot){
        chatScreen.updateUserList(snapshot.data().list_users)
    })
    .catch(function(err){
        console.error("fail to fetch conversation: ",err)
    })

}

export {addUser, saveConversation, updateActiveCon, activeConversation, listenConversation}
