function MenuOn(){
    document.getElementById("MenuPage").style.display="block";
}
function MenuOff(x){
    x.style.display="none";
}
function AccountOn(){
    document.getElementsByClassName("AccountBar")[0].style.display="block";
}
function AccountOff(x){
    x.style.display="none";
}



//movie.html
let castButton= document.getElementsByClassName("CastAndCrewPanel")[0];
let RevButton= document.getElementsByClassName("ReviewsPanel")[0];
let DetButton= document.getElementsByClassName("DetailsPanel")[0];

function ShowCast(){
    castButton.style.display="block";
    RevButton.style.display="none";
    DetButton.style.display="none";
}
function ShowRev(){
    castButton.style.display="none";
    RevButton.style.display="block";
    DetButton.style.display="none";
}
function ShowDet(){
    castButton.style.display="none";
    RevButton.style.display="none";
    DetButton.style.display="block";
}
/*Account page*/
function showReviews(){
    console.log("bruh");
    document.getElementById("AccountReviews").style.display="inline";
    document.getElementById("AccountFollowing").style.display="none";
    document.getElementById("AccountWatchlist").style.display="none";
}
function showFollowing(){
    document.getElementById("AccountReviews").style.display="none";
    document.getElementById("AccountFollowing").style.display="inline";
    document.getElementById("AccountWatchlist").style.display="none";
}
function showWatchlist(){
    document.getElementById("AccountReviews").style.display="none";
    document.getElementById("AccountFollowing").style.display="none";
    document.getElementById("AccountWatchlist").style.display="inline";
}

/*EDIT PAGE*/
function showTitle(){
    document.getElementById("TitleAndDescrip").style.display="inline";
    document.getElementById("CastAndCrew").style.display="none";
    document.getElementById("Details").style.display="none";
}
function showCast(){
    document.getElementById("TitleAndDescrip").style.display="none";
    document.getElementById("CastAndCrew").style.display="inline";
    document.getElementById("Details").style.display="none";
}
function showDetails(){
    console.log("touchhh");
    document.getElementById("TitleAndDescrip").style.display="none";
    document.getElementById("CastAndCrew").style.display="none";
    document.getElementById("Details").style.display="inline";
}

/*SETTINGS*/
function showProfile(){
    document.getElementById("EditProfileBlock").style.display="inline";
    document.getElementById("ChangePasswordBlock").style.display="none";
    document.getElementById("ContributionBlock").style.display="none";
}
function showChangePass(){
    document.getElementById("EditProfileBlock").style.display="none";
    document.getElementById("ChangePasswordBlock").style.display="inline";
    document.getElementById("ContributionBlock").style.display="none";
}
function showContributions(){
    document.getElementById("EditProfileBlock").style.display="none";
    document.getElementById("ChangePasswordBlock").style.display="none";
    document.getElementById("ContributionBlock").style.display="inline";
}

/*SEARCH BUTTONS*/
function showSearchMovies(){
    document.getElementById("SearchResultsUsers").style.display="none";
    document.getElementById("SearchResultsMovie").style.display="inline";
    document.getElementById("SearchResultsPeople").style.display="none";

}
function showSearchPeople(){
    document.getElementById("SearchResultsUsers").style.display="none";
    document.getElementById("SearchResultsMovie").style.display="none";
    document.getElementById("SearchResultsPeople").style.display="inline";
}
function showSearchUsers(){
    document.getElementById("SearchResultsUsers").style.display="inline";
    document.getElementById("SearchResultsMovie").style.display="none";
    document.getElementById("SearchResultsPeople").style.display="none";
}

/*USER LOGIN*/
function init(){
    isLogged();
}


function isLogged(){
    console.log("touched is logged");
    let x;
    let request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                console.log(this.responseText);
                
                if (this.responseText == "true" || this.responseText == true){
                    myAccountON();
                } else {
                    myAccountOFF();
                }
            }
        }
                
        request.open("POST","/isLoggedIn");
        request.send();

}

function myAccountON(){
    console.log("my account on");
    document.getElementsByClassName('myAccount')[0].style.display='block';
    document.getElementsByClassName('signIn')[0].style.display='none';
   
}

function myAccountOFF(){
    document.getElementsByClassName('myAccount')[0].style.display='none';
    document.getElementsByClassName('signIn')[0].style.display='block';
}

function SignOut(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                console.log(this.responseText);
                alert('You are signed out');
                window.location.replace("http://localhost:3000");
                
            }
        }
                
        request.open("POST","/signOut");
        request.send();
}

function addToWatchlist(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                console.log(this.responseText);
                if(this.responseText=='true'){
                    document.getElementById('MovieHeartButton').style.color='red';
                }                
            }
        }
                
        request.open("POST","/addWatchlist");
        request.send();
    
}
function GoToProfile(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                console.log(this.responseText);
                    let location = 'http://localhost:3000/users/'+this.responseText.toLowerCase();
                    window.location.replace(location);
                }                
            }
        
                
        request.open("POST","/GoProfile");
        request.send();
}