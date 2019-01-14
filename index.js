
function startload() {
  if (!localStorage.token) {
    localStorage.token = 0;
  }
  document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
  if (localStorage.canopenLS = true) {
    document.getElementById("canopen").innerHTML = "You can open a loot Crate";
    localStorage.canopenLS = true;
  } else {
    document.getElementById("canopen").innerHTML = "You can not open a loot Crate";
      localStorage.canopenLS = false;
    setTimeout(function() {
      localStorage.canopenLS = true;
      document.getElementById("canopen").innerHTML = "You can open a loot Crate";
      alert('You can now open a Loot crate');
    }, 50000);
  }
}

function GetToken() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.token) {
      localStorage.token = Number(localStorage.token) + 3;
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
  if (localStorage.canopenLS = true) {
    location.replace("https://bakeybakers.com/game/LootCrate");
    localStorage.canopenLS = false;
  } else {
    document.getElementById("canopen").innerHTML = "You can not open a loot Crate";
      localStorage.canopenLS = false;
    setTimeout(function() {
      localStorage.canopenLS = true;
      document.getElementById("canopen").innerHTML = "You can open a loot Crate";
      alert('You can now open a Loot crate');
    }, 50);
  }
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

function payfive(_url) {
  this.url = _url;
  if (typeof(Storage) !== "undefined") {
    if (localStorage.token) {
      if (localStorage.token >= 5) {
        localStorage.token = Number(localStorage.token) - 5;
        location.replace(this.url);
        document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
      }else{
        alert("You Do Not have enough Tokens to Play. You need 5 Tokens");
      }
    }
  }
}

function payfiveChromeExtension(_url, _urlChromeExtension) {
  this.url = _url;
  this.urlChromeExtension = _urlChromeExtension;
  if (typeof(Storage) !== "undefined") {
    if (localStorage.token) {
      //var ExtentionDownloadConfirm_2 = confirm("Would you like to download the extention to play anywhere without");
      if (localStorage.token >= 5) {
        var ExtentionDownloadConfirm = confirm("Would you like to download the extention to play anywhere without");
        if(!ExtentionDownloadConfirm){
        localStorage.token = Number(localStorage.token) - 5;
        location.replace(this.url);
        document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
      }else{
      localStorage.token = Number(localStorage.token) + 15;
        location.replace(this.urlChromeExtension);
        document.getElementById("tokenamount").innerHTML = "You have " + localStorage.token + " Tokens.";
      }
    }else{
        var ExtentionDownloadConfirm_2 = confirm("You Do Not have enough Tokens to Play. You need 5 Tokens. Or you can play for no tokens with the extension version");
       if(ExtentionDownloadConfirm_2)
          {
            location.replace(this.urlChromeExtension);
          }
      }
    }
  }
}
