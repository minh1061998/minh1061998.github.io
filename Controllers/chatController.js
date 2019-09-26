import {newMessages, saveMessages,changeActiveCon} from "../Models/messages.js"
import {addUser, updateActiveCon} from "../Models/conversation.js"

const chatController ={
    sendMessages: function(content){
        const messages = newMessages(content);
        saveMessages(messages);

    },
    addUser: function(email){
        addUser(email);
    },
    changeActiveIcon: function(nextConId){
        updateActiveCon(nextConId) // update conversation model
        changeActiveCon() // update message model
      
    }
};
export default chatController;