function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "You have " + localStorage.clickcount + " cookie(s).";
    }
}
function clickCounterone() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1000;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "You have " + localStorage.clickcount + " cookie(s).";
    }
}
function RBB() {
    document.body.style.backgroundColor = "#ff0000"   
}
 
 function BBB() {
    document.body.style.backgroundColor = "#0000cf";
 }
  function WBB() {
    document.body.style.backgroundColor = "#f0f0f0";
 } 
    

    function PBB() {
    document.body.style.backgroundColor = "#ff00ff";
 }
    function YBB() {
    document.body.style.backgroundColor = "#ffff00";
 }

    
