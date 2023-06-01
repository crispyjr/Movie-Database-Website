const express = require ('express');
const app = express();
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const querystring = require('query-string');


app.use(session({secret: "Secret"}));
app.use(express.json());
app.use(express.static('/static'));
app.get("/", (req, res)=> { res.sendFile(path.join(__dirname + '/MMDB_Home.html')) });
app.use('/html', express.static(path.join(__dirname + '/HTML')));
app.use('/css', express.static(__dirname + '/HTML/CSS'));
app.use('/js', express.static(__dirname + '/HTML/JAVASCRIPT'));
app.use('/img', express.static(__dirname + '/HTML/Images'));
app.use('/JSON', express.static(__dirname + '/HTML/JSON'));
app.use('/movies', express.static(__dirname + '/HTML/movies'));
app.use('/views', express.static(__dirname+'/HTML/views'));
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, '/HTML/views'));
app.set('css',path.join(__dirname, 'HTML/CSS'));
app.use('/', express.static(__dirname));


app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname + '/HTML/MMDB_logIn.html'));
});
app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname + '/HTML/MMDB_Register.html'));
});
app.get('/AccountSettings',function(req,res){
    res.render('settings', {id:req.session.username});
})

let movieData = require("./HTML/Movie-Database-Project-Materials/movie-data.json");
let userData = require("./HTML/JSON/users.json");
let reviewData = require("./HTML/JSON/reviews.json");
let currentMovie;
let movies = {}
let movieTitle = {}
let people = {}
let userss = {}

let n=1;
movieData.forEach(m=>{
    movies[n] = m;
    movieTitle[n++]= m.Title;
    people[m.Title]=m.Actors.toUpperCase();
});
userData.Users.forEach(u=>{
    userss[u.id]=u.Uname;
});

console.log("This is what is inside our objects: ");
console.log("--------------------------------------------------------")
console.log("Movies: ");
///console.log(movieTitle);
console.log("-----------------------------------------------------------");
console.log("PEOPLE: ");
//console.log(people);
console.log("-----------------------------------------------------------");
console.log("USERS: ");
console.log(userss);

//app.get("/movies", parseQuery, getMovies);

app.get('/movies',function(req,res){
    let movie = req.query.movie;
    
    let finalMovies = [];
    if (movie){
        console.log('hey');
        movies.forEach(m=>{
            console.log(m.Title);
            
            if(m.Title.includes(movie)){
                console.log("id found");
                finalMovies.push(movie);
                
            }
        });
    } else {

        finalMovies = movieData;
    }
    res.render('index', {items:finalMovies});
    //res.send(finalMovies);
});

app.get('/movies/:movie',function(req,res){
    let movie = req.params.movie;
    console.log(req.params.movie);

    movieData.forEach(m=>{
        if(movie == m.Title){
            currentMovie=m.Title;
            let a = m.Actors.split(',');
            let w = m.Writer.split(',');
            let b=[];
            let rev=[];
            for(let i=0;i<w.length;i++){
                b[i]=w[i].split('(');
            }
            let n=0;
            reviewData.Reviews.forEach(r=>{
                if(r.Movie == movie){
                    rev[n++]=r;
                }
            });
            //let b = w[0].split('(');
            console.log(a);
            console.log(b);
            console.log(rev);
           //res.send(m); 
           res.render('movies',{film:m, cast:a, write:b, review:rev});
        }
        
    });
    
});

app.get('/users', function(req,res){
    let account = req.query.account;
    
    let finalaccounts = [];
    if (account){
        console.log('hey');
        userss.forEach(m=>{
            console.log(m.Uname);
            
            if(m.Title.includes(account)){
                console.log("id found");
                finalMovies.push(account);
                
            }
        });
    } else {

        finalaccounts = userData;
    }
    res.render('users', {items:finalaccounts.Users});
});

app.get('/users/:user',function(req,res){
    let user = req.params.user;
    console.log(req.params.user);

    userData.Users.forEach(u=>{
        if(user == u.Uname){
            
           
            let rev=[];
            
            let n=0;
            reviewData.Reviews.forEach(r=>{
                if(r.userId == u.id){
                    rev[n++]=r;
                }
            });
            //let b = w[0].split('(');
            
            console.log(rev);
           //res.send(m); 
           res.render('profile',{id:u, review:rev});
        }
        
    });
    
});


let usersfile = fs.readFileSync('HTML/JSON/users.json');
let users= JSON.parse(usersfile);
let reviewsfile = fs.readFileSync('HTML/JSON/reviews.json');
let reviews= JSON.parse(reviewsfile);

function bing(req,res,next){
    let temp = users.Users[0];
    res.render('mm',{'id':temp})
}





function auth(req,res,next){
    if(!req.session.loggedIn){
        res.status(401).send("Not logged in");
        return;
    }
}





//ur just grabbing the information from the function and doing all the stuff u did in the file to here.



app.use(function(req,res,next){
    console.log("-------------------------");
    console.log("Request Method: "+ req.method);
    console.log("Request URL: "+ req.url);
    console.log("Request PATH: "+ req.path);
    console.log("Request Session: ");
    
    console.log(req.session);
    console.log(req.session.loggedIn);
    console.log(req.session.username);
    next();
});


//S I G N I N
app.post("/signin", express.json(),function (req, res){
    let username = req.body.user;
    let password = req.body.pass;

    console.log(username + " " + password);
    //console.log(users.Users);
    users.Users.forEach(account=>{
        if(username.toUpperCase() == account.Uname.toUpperCase()){
            console.log("username found");
            if(password == account.Pwd){
                console.log("user login complete")
                //isLogin=true;
                //console.log(isLogin);
                req.session.username = username;
                console.log("touched username");
                req.session.loggedIn = true;
                req.session.user_id = account.id;
                res.status(200).send('true');

                //res.redirect('/')
            }
        }
    })
    res.status(200).send();
    console.log("req username: "+req.session.username);
    
    console.log("req is: " +req.session.loggedIn);
    
});


//R E G I S T E R
app.post("/register", express.json(), registerUser);
function registerUser(req,res){
    let username = req.body.user;
    let password = req.body.pass;
    let check = req.body.check;
    let userCheck = true;

    console.log(req.body);
    console.log(username + " " + password);

    users.Users.forEach(account=>{
        console.log(req.body.user + " compared to: "+ account.Uname);
        if(req.body.user.toUpperCase() == account.Uname.toUpperCase()){
            console.log("username already exists");
            userCheck = false;
        }
    })
    if(userCheck && check){
        console.log("check trues");
        let curId=users.Users.length;
        users.Users.push({"Uname": username, "Pwd":password, "id":users.Users.length, "userType": "regular", "edits":0, "level":0, "reviews":0});
        
        fs.writeFileSync('HTML/JSON/users.json', JSON.stringify(users));
        console.log("success");
        req.session.username = username;
        console.log("touched register username");
        req.session.loggedIn = true;
        req.session.user_id = curId;
        res.status(200).send('success');
    
    }else{
        if(check==false){
            console.log("password does not meet requirement")
        }
    }
    res.status(200).send();
    
}

//C H E C K I F U S E R I S L O G G E D I N
app.post('/isLoggedIn',function(req,res){
    res.send(req.session.loggedIn);
    console.log("log in: "+req.session.loggedIn);
});

//C H A N G E P A S S W O R D
app.post('/ChangePass', express.json(), function(req, res){
    let currentPass = req.body.current;
    let newpass1 = req.body.new1;
    let userID = req.session.user_id;
    let check = req.body.check;
    req.session.passChange = false;

    console.log(currentPass);
    console.log(newpass1);
    console.log(check);
    console.log("id:"+ userID);

    if(currentPass == users.Users[userID].Pwd){
        console.log("Current password true: "+ currentPass);
        if(check){
            users.Users[userID].Pwd = newpass1;
            fs.writeFileSync('HTML/JSON/users.json', JSON.stringify(users));
            console.log("successfully changed");
            req.session.passChange=true;
        }
    }
    else{
        console.log("Current Pass incorrect: input: "+currentPass+ "actual pass"+users.Users[userID].Pwd);
    }

    res.status(200).send();
});
app.post('/PassChangeStatus',function(req,res){
    res.send(req.session.passChange);
    console.log("log in: "+req.session.loggedIn);
    console.log("touchy me here in passchangestatus");
});

//S I G N O U T
app.post('/signOut', function(req,res){
    req.session.loggedIn=false;
    req.session.username=undefined;
    res.send(req.session.loggedIn);
});

//R E V I E W S
app.post('/submitreviews',express.json(), function(req,res){
    let rating = req.body.rating;
    let headline = req.body.headline;
    let paragraph = req.body.paragraph;
    let film = currentMovie;
    let check = req.body.check;
    console.log('film: '+film);
    console.log('user: '+ req.session.username);
    if(req.session.loggedIn!=false){
    if(check){
        reviews.Reviews.push({"Movie":film,"userId":req.session.user_id,"Uname":req.session.username, "rating":rating, "headline":headline, "paragraph":paragraph});
        fs.writeFileSync('HTML/JSON/reviews.json', JSON.stringify(reviews));
        res.status(200).send(JSON.stringify({'added':'true', 'movie':film, 'user':req.session.username}));
        console.log('reviews has been successfully added');
    }else{
        res.send('error');
        console.log('error');
    }
    }
    else{
        res.send('error');
        console.log('error');
    }
});

app.post('/GoProfile', function(req,res){
    res.send(req.session.username);
});



app.listen(3000);
console.log("Server listening at http://localhost:3000")
