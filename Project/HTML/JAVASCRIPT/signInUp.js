//const { readSync } = require("fs");


//username and passwords
let users=[
    {Uname:"blueberry55", Pwd:"SpongeBob12", id:0, userType:"regular"},
    {Uname:"blueberry54", Pwd:"SpongeBob12", id:1, userType:"regular"},
    {Uname:"blueberry53", Pwd:"SpongeBob12", id:2, userType:"regular"}
];

let duplicate=false;
let password = document.getElementById("Password");
let username = document.getElementById("Username");
//password checks variables
let lowerCheck=false;
let upperCheck=false;
let numCheck=false;
let passLength=false;
let passCheck=false;
//password checks variables
//movie variables;
let reviews=[];
let numofReviews=0;
let reviewList=document.getElementById("WrittenReviews");






function addUser(){
    console.log("you touched addUser");
    let request = new XMLHttpRequest();
    let user = document.getElementById("Username").value;
    let pass = document.getElementById("Password").value;
    if(lowerCheck && upperCheck && passLength && numCheck){
        passCheck=true;
    }
    
    request.onreadystatechange = function(){
        console.log(this.readyState + " " + this.status);
        if(this.readyState == 4 && this.status == 200){

            if(this.responseText == 'success'){
                window.location.replace("http://localhost:3000");
            }
            console.log(user+ "pass:" + pass);
        }
    }
     request.open("POST", "/register", true);
     request.setRequestHeader('Content-type', 'application/json');
     request.send(JSON.stringify({"user":user,"pass":pass,"check":passCheck}));

     passCheck = false;
    /*
    console.log("New User: "+ username.value + password.value);
    users.Users.forEach(user=>{
        if(user.Uname.toUpperCase()==username.value.toUpperCase()){
            duplicate=true;
            alert(username.value + "already exists")
        }
    })
    console.log("duplicate: "+duplicate);
    if (username.value !="" && password.value !="" && duplicate!=true){
        console.log("step 1 complete")
        if(lowerCheck && upperCheck && numCheck && passLength){
            console.log("step 2 complete");
            users.Users.push({"Uname": username.value, "Pwd":password.value, "id":amountofUsers, "userType": "regular"});
            //users[amountofUsers]={Uname:username.value, Pwd:password.value, id:amountofUsers, userType:"regular"};
            console.log(users.Users[amountofUsers]);
            amountofUsers++;
        }
        else{
            alert("Password does not meet requirements");
        }
        
    }
    console.log(users.Users);
    duplicate=false;
    password.value="";
    username.value="";
    */

}
function sign(name){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(name);
        }
    }
    request.open("POST", "/name", true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({"namee":name, "pass":name}));
    
}
function signIn(){
    console.log("you touched signIn");
    let request = new XMLHttpRequest();
    let user = document.getElementById("Username").value;
    let pass = document.getElementById("pwd").value;
    
    request.onreadystatechange = function(){
        console.log(this.readyState + " " + this.status);
        //console.log(this.responseText);
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            if(this.responseText == 'true'){
                window.location.replace("http://localhost:3000");
            }
            console.log(user+ "pass:" + pass);
            
        }
    }
     request.open("POST", "/signin", true);
     request.setRequestHeader('Content-type', 'application/json');
     request.send(JSON.stringify({"user":user,"pass":pass}))
    
    
    

}


if(password!=null){
password.onkeyup = function(){
    console.log("touchy");
    let lowerCaseLetters = /[a-z]/g;
    if(password.value.match(lowerCaseLetters)){
        document.getElementById("lowerCheck").style.color="green";
        lowerCheck=true;
    }else{
        document.getElementById("lowerCheck").style.color="maroon";
        lowerCheck=false;
    }
    let upperCaseLetters = /[A-Z]/g;
    if(password.value.match(upperCaseLetters)){
        document.getElementById("upperCheck").style.color="green";
        upperCheck=true;
    }else{
        document.getElementById("upperCheck").style.color="maroon";
        upperCheck=false;
    }
    let numberCheck = /[0-9]/g;
    if(password.value.match(numberCheck)){
        document.getElementById("numCheck").style.color="green";
        numCheck=true;
    }else{
        document.getElementById("numCheck").style.color="maroon";
        numCheck=false;
    }
    if(password.value.length>7){
        document.getElementById("passCheck").style.color="green";
        passLength=true;
    }else{
        document.getElementById("passCheck").style.color="maroon";
        passLength=false;
    }
}
}
