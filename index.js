function startload(){
        if (!localStorage.token) {
        	localStorage.token = 0;
        }
	document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
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
