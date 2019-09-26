import setScreen from "./index.js"
import loginscreen from "./login.js"
import authController from "../Controllers/authController.js"
import {responseCode} from "../Controllers/response.js"

const screen = `
<div id="register-screen" class="width-100 height-100"> 
    <div class="card">
    
    <form id="js-formRegister">
    <h4 class="align-center">MindX Chat Register</h4>
        <div class="input-group">
            <label> Name </label>
            <input type="text" id="name">
        </div>

        <div class="input-group">
            <label >Email</label>
            <input type="email" id="email">
        </div>
        <div class="input-group>
            <label for="">Password</label>
            <input type="password" id="password">
        </div>

        <div class="input-group">
            <label for="">Retype Password</label>
            <input type="password" id="retypePassword">
        </div>
        <div>
            <button class=" btn btn-primaty" type="submit">Register</button>

            <button class="btn" id="js-btnBackToLogin" type="button">Back To Login</button>
        </div>
    </form>
    </div>
</div>
`;

function onLoad() {
    const btnBackToLogin = document.getElementById("js-btnBackToLogin");
    const formRegister = document.getElementById("js-formRegister");
    formRegister.addEventListener("submit", async function(event){
        event.preventDefault();
        const request ={
            name: formRegister.name.value,
            email: formRegister.email.value,
            password: formRegister.password.value,
            retypePassword: formRegister.retypePassword.value
        };
        const response = await authController.register(request)
        console.log(response);
        switch(response.code){
            case responseCode.auth.register_success:
                alert("Registered successfully! Login to enjoy!");
                return;
        }
    });

    btnBackToLogin.addEventListener("click", function(){
        setScreen(loginscreen);
    });
}

export default{
    ui: screen,
    onLoad: onLoad
}