function changeHeartColour(x){
    if(x.innerHTML == "♥️"){
        x.innerHTML="♡";
        x.style.color="white";
    }else{
        x.innerHTML="♥️";
        x.style.color="red";
    }
}
let lowerCheck=false;
let upperCheck=false;
let numCheck=false;
let passLength=false;
let passMatch=false;
let password = document.getElementById("NewPasswordBox");
if(password!=null){
    password.onkeyup = function(){
        console.log("touchy");
        document.getElementById("PasswordMatch").style.color="black";
        let lowerCaseLetters = /[a-z]/g;
        if(password.value.match(lowerCaseLetters)){
            document.getElementById("lowerCheck").style.color="green";
            lowerCheck=true;
        }else{
            document.getElementById("lowerCheck").style.color="black";
            lowerCheck=false;
        }
        let upperCaseLetters = /[A-Z]/g;
        if(password.value.match(upperCaseLetters)){
            document.getElementById("upperCheck").style.color="green";
            upperCheck=true;
        }else{
            document.getElementById("upperCheck").style.color="black";
            upperCheck=false;
        }
        let numberCheck = /[0-9]/g;
        if(password.value.match(numberCheck)){
            document.getElementById("numCheck").style.color="green";
            numCheck=true;
        }else{
            document.getElementById("numCheck").style.color="black";
            numCheck=false;
        }
        if(password.value.length>7){
            document.getElementById("passCheck").style.color="green";
            passLength=true;
        }else{
            document.getElementById("passCheck").style.color="black";
            passLength=false;
        }
        if(password.value == document.getElementById("NewPasswordBox2").value){
            console.log("are u touching me?");
            document.getElementById("PasswordMatch").style.color="green";
            passMatch = true;
        }
        else{
            document.getElementById("PasswordMatch").style.color="black";
            passMatch = false;
        }
    }
}
let password2 = document.getElementById("NewPasswordBox2");
if(password2!=null){
    password2.onkeyup = function(){
        console.log("touchy2");
        if(password2.value == document.getElementById("NewPasswordBox").value){
            console.log("are u touching me?");
            document.getElementById("PasswordMatch").style.color="green";
            passMatch = true;
        }
        else{
            document.getElementById("PasswordMatch").style.color="black";
            passMatch = false;
        }
    }
}
function changePassword(){
    console.log("You touched change password");
    let request = new XMLHttpRequest()
    let current = document.getElementById("CurrentPasswordBox").value;
    let new1 = document.getElementById("NewPasswordBox").value;
    let new2 = document.getElementById("NewPasswordBox2").value;
    let Check = false;

    if(lowerCheck && upperCheck && passLength && numCheck && passMatch){
        Check=true;
    }

    request.onreadystatechange = function(){
        console.log(this.readyState + " " + this.status);
        //console.log(this.responseText);
        if(this.readyState == 4 && this.status == 200){
            console.log(current+ " new: " + new1);
            PasswordSuccess();
        }
    }
     request.open("POST", "/ChangePass", true);
     request.setRequestHeader('Content-type', 'application/json');
     request.send(JSON.stringify({"current":current,"new1":new1, "check":Check}));
    Check=false;
}

function PasswordSuccess(){
    console.log("touched password success");
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.responseText);
            
            if (this.responseText == "true" || this.responseText == true){
                console.log("password change success");
                document.getElementById("CurrentPasswordBox").value="";
                document.getElementById("NewPasswordBox").value="";
                document.getElementById("NewPasswordBox2").value="";
                document.getElementById("PasswordMatch").style.color="black";
                document.getElementById("passCheck").style.color="black";
                document.getElementById("numCheck").style.color="black";
                document.getElementById("upperCheck").style.color="black";
                document.getElementById("lowerCheck").style.color="black";
                lowerCheck = false;
                upperCheck = false;
                passLength = false;
                numCheck = false;
                passMatch = false;

                successon();
                setTimeout(successoff, 5000);
                


            } else {
                console.log("error");
                
            } 
            //console.log("touch me success off");
            //
        }
    }
            
    request.open("POST","/PassChangeStatus");
    request.send();
    

}

function successon(){
    document.getElementById("Success").style.display="inline";
}
function successoff(){
    document.getElementById("Success").style.display="none";
}

