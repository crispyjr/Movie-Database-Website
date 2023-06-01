let reviews=[];
let numofReviews=0;
let reviewList=document.getElementById("WrittenReviews");
function submitReview(){
    //input
    let headlineinput = document.getElementById("WriteHeadlineInput").value;
    let paragraphinput = document.getElementById("WriteParagraphInput").value;
    let ratinginput = document.getElementById("RatingInput").value;
    let ratingCheck = /[0-9]/g;
    let check = false;

    if(headlineinput != "" && paragraphinput != "" && ratinginput != ""){
        console.log("first step complete");
        if(ratinginput.match(ratingCheck)){
            console.log("second step complete");
            if(ratinginput<=10){
                check=true;
            }
            

        }
    }

console.log("you touched addUser");
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(check){
            response = JSON.parse(this.responseText);
            if(response.added == 'true'){
                console.log(response.movie);
                console.log(response.user);

                let headline=document.createElement('p');
                let paragraph=document.createElement('p');
                let rating=document.createElement('p');
                let reviewUser=document.createElement('a');
                let line=document.createElement('span');
            //set attributes
                headline.setAttribute('id','ReviewHeadline');
                headline.innerText=headlineinput;
                paragraph.setAttribute('id', 'ReviewParagraph');
                paragraph.innerText=paragraphinput;
                rating.setAttribute('id', 'ReviewRating');
                rating.innerText=ratinginput + "/10";
                reviewUser.setAttribute('id', 'ReviewUser');
                reviewUser.setAttribute('href', 'MMDB_Account.html');
                reviewUser.innerText=response.user;
                line.setAttribute('id', 'ReviewLine');

                const newDiv = document.createElement('div');
            newDiv.setAttribute('id', "ReviewBar");
            reviewList.appendChild(newDiv);
            newDiv.appendChild(headline);
            newDiv.appendChild(paragraph);
            newDiv.appendChild(rating);
            newDiv.appendChild(line);
            newDiv.appendChild(reviewUser);
            console.log("review added successfully");
            document.getElementById("WriteHeadlineInput").value="";
            document.getElementById("WriteParagraphInput").value="";
            document.getElementById("RatingInput").value="";
            }
            else{
                console.log('error');
            }
        }
        }
    }
     request.open("POST", "/submitreviews", true);
     request.setRequestHeader('Content-type', 'application/json');
     request.send(JSON.stringify({"headline":headlineinput,"paragraph":paragraphinput,"rating":ratinginput, "check":check}));


            //create elements
/*
             let headline=document.createElement('p');
            let paragraph=document.createElement('p');
            let rating=document.createElement('p');
            let reviewUser=document.createElement('a');
            let line=document.createElement('span');
        //set attributes
            headline.setAttribute('id','ReviewHeadline');
            headline.innerText=headlineinput;
            paragraph.setAttribute('id', 'ReviewParagraph');
            paragraph.innerText=paragraphinput;
            rating.setAttribute('id', 'ReviewRating');
            rating.innerText=ratinginput + "/10";
            reviewUser.setAttribute('id', 'ReviewUser');
            reviewUser.setAttribute('href', 'MMDB_Account.html');
            reviewUser.innerText=users[amountofUsers-1].Uname;
            line.setAttribute('id', 'ReviewLine');


            const newDiv = document.createElement('div');
            newDiv.setAttribute('id', "ReviewBar");
            reviewList.appendChild(newDiv);
            newDiv.appendChild(headline);
            newDiv.appendChild(paragraph);
            newDiv.appendChild(rating);
            newDiv.appendChild(line);
            newDiv.appendChild(reviewUser);
            console.log("review added successfully");
            document.getElementById("WriteHeadlineInput").value="";
            document.getElementById("WriteParagraphInput").value="";
            document.getElementById("RatingInput").value="";
           
        */   

}

