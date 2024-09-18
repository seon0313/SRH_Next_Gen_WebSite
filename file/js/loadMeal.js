var morning = document.getElementById("morning");
var lunch = document.getElementById("lunch");
var dinner = document.getElementById("dinner");

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
function loadMeal(){
    getJSON('/api/meal?day=20240920', function(error, js){
        if (error !== null) {console.log("Error");}
        else {
            for (var l=0; l<3; l++){
                console.log(js[l.toString()]["meal"]);
                const text = js[l.toString()]["meal"];
                const texts = text.split("\n");
                for (var i=0; i<texts.length; i++){
                    const t = document.createElement("p");
                    t.innerText = texts[i];
                    if (l===0) morning.append(t);
                    else if (l===1) lunch.append(t);
                    else if (l===2) dinner.append(t);
                }
            }
        }
    });
}