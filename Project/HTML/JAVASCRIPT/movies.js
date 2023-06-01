let request= new XMLHttpRequest();
let response;
/*{
    "Title": "Toy Story",
    "Year": "1995",
    "Rated": "G",
    "Released": "22 Nov 1995",
    "Runtime": "81 min",
    "Genre": "Animation, Adventure, Comedy, Family, Fantasy",
    "Director": "John Lasseter",
    "Writer": "John Lasseter (original story by), Pete Docter (original story by), Andrew Stanton (original story by), Joe Ranft (original story by), Joss Whedon (screenplay by), Andrew Stanton (screenplay by), Joel Cohen (screenplay by), Alec Sokolow (screenplay by)",
    "Actors": "Tom Hanks, Tim Allen, Don Rickles, Jim Varney",
    "Plot": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    "Language": "English",
    "Country": "USA",
    "Awards": "Nominated for 3 Oscars. Another 27 wins & 20 nominations.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "100%"
      },
      {
        "Source": "Metacritic",
        "Value": "95/100"
      }
    ],
    "Metascore": "95",
    "imdbRating": "8.3",
    "imdbVotes": "864,385",
    "imdbID": "tt0114709",
    "Type": "movie",
    "DVD": "20 Mar 2001",
    "BoxOffice": "N/A",
    "Production": "Buena Vista",
    "Website": "N/A",
    "Response": "True",
    "url":"http://localhost:3000/movies/1"
  }*/
function getMovies(){
    console.log("It touched me");
    request.onreadystatechange = function(){
        console.log("Touched me here too");
        //console.log(this.readyState);
        //console.log(this.status);
        if(this.readyState == 4 && this.status == 200){
            console.log("So closee");
           
            console.log(this.responseText + "big");
            response = JSON.parse(this.responseText);
            getActors(response.Actors);
            getWriters(response.Writer);
            getRatings(response.Ratings);
            //moviepanel
            console.log(response.Title +"bruuuuuuuuuuuh");
            document.getElementById("MovieTitle").innerHTML = response.Title;
            document.getElementById("Director").innerHTML = response.Director;
            document.getElementById('MovieImage').src= response.Poster;
            document.getElementById('MovieDescription').innerHTML=response.Plot;
            document.getElementById('MovieGenre').innerHTML="Genre: "+response.Genre;
            //detailspanel
            document.getElementById("Year").innerHTML =response.Year;
            document.getElementById("Release").innerHTML = response.Released;
            document.getElementById("DVD").innerHTML = response.DVD;
            document.getElementById("Country").innerHTML =response.Country;
            document.getElementById("Language").innerHTML = response.Language;
            document.getElementById("Runtime").innerHTML = response.Runtime;
            document.getElementById("Boxoffice").innerHTML = response.BoxOffice;
            document.getElementById("Production").innerHTML = response.Production;
            
            

            //document.getElementById('MovieRating').innerHTML = response.
            
            //castpanel
        }
        
    }
    request.open("GET", "1.json", true);
    //request.open("GET", "http://localhost:3000/");
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader("Origin", "http://localhost:300/")
    //request.setRequestHeader('Access-Control-Allow-Headers', '*');
    //request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.send();
    console.log("bruh");
}

function getActors(x){
    console.log("touched actors");
    let actors = x.split(',');
    console.log(actors);
    let castlist = document.getElementById("CastList");
    actors.forEach(actor => {
        let personlist = document.createElement('li');
        let person = document.createElement('a');
        person.setAttribute('href', 'MMDB_actor.html');
        person.setAttribute('id', actor);
        person.innerHTML=actor;
        castlist.appendChild(personlist);
        personlist.appendChild(person); 
        console.log("success");
    });
    console.log("completed");

}

function getWriters(x){
    console.log("touched writers");
    let writers = x.split(',');
    console.log(writers);
    let writerlist = document.getElementById('WriterList');
    writers.forEach(writer =>{
        let writerspilt = writer.split('(');
        console.log(writerspilt);
        let personlist = document.createElement('li');
        let person = document.createElement('a');
        let brackets = document.createElement('span');
        person.setAttribute('href', 'MMDB_actor.html');
        person.setAttribute('id', writerspilt[0]);
        person.innerHTML = writerspilt[0] + "<br />";
        brackets.innerHTML= "("+writerspilt[1];
        writerlist.appendChild(personlist);
        personlist.appendChild(person);
        personlist.appendChild(brackets);
    })
}

function getRatings(x){
    
    console.log("touched ratings scores");
    console.log(x);
    console.log(x[0])
    document.getElementById('InternetRating').innerHTML="N/A";
    document.getElementById('CriticRating').innerHTML="N/A";
    document.getElementById('RottenRating').innerHTML="N/A";
    x.forEach(rate =>{
        console.log(rate.Source);
        if(rate.Source == "Internet Movie Database"){
            document.getElementById('InternetRating').innerHTML=rate.Value;
        }
        if(rate.Source == "Rotten Tomatoes"){
            document.getElementById('RottenRating').innerHTML=rate.Value;
        }
        if(rate.Source == "Metacritic"){
            document.getElementById('CriticRating').innerHTML=rate.Value;
        }
        
    })
    console.log("complete");
}

