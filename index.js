function startload(){
        if (!localStorage.token) {
        	localStorage.token = 0;
        }
	document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
}	
    
    function GetToken() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.token) {
            localStorage.token = Number(localStorage.token)+3;
		location.replace("https://zipansion.com/1po69");
        } else {
            localStorage.token = 3;
        }
        document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
    } else {
        document.getElementById("tokenamount").innerHTML = "Sorry, your browser does not support web storage..., I will give you 100 a day, sorry for the inconvenece";
    }
}

function OpenLootCrate() {
	location.replace("https://bakeybakers.com/game/LootCrate");
}
	
		function getStarRatingString(rating) {
  var toReturn = "";
  for (var i = 0; i < 5; i++) {
    if (i < rating) {
      toReturn += "★";
    } else {
      toReturn += "☆";
    }
  }
  return toReturn;
}

function payfive(_url){
	 this.url  = _url;
	 if(typeof(Storage) !== "undefined") {
        if (localStorage.token) {
		if(localStorage.token >=5){
            localStorage.token = Number(localStorage.token)-5;
			location.replace(this.url);
			 document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
		}
	}
 }
