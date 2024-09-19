var morning = document.getElementById("morning");
var lunch = document.getElementById("lunch");
var dinner = document.getElementById("dinner");

var ctp = document.getElementById("meal_control_p");

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

function mealDatePlus(){
    var last = new Date(Number(year), Number(month)-1, 0).getDate();
    console.log(last);
    if (last===Number(day)){
        day = '1';
        month = Number(month)+1;
        month = month.toString();
        setMonth(month);
    } else {
        day = Number(day)+1;
        day = day.toString();
        setDay(day);
    }
    setDate();
    loadMeal();
}

function mealDateMinus(){
    if (Number(day) <= 1) {
        month -= 1;
        var last = new Date(Number(year), Number(month)-1, 0).getDate();
        day = last;
    } else day -= 1;
    setDate();
    loadMeal();
}

function resetMealText(){
    var date_ = date.split("-");
    ctp.innerText = "";
    for (var i=0; i<date_.length; i++){
        var result = date_[i];
        if (date_[i].length <= 1){
            result = "0"+date_[i];
        }
        ctp.innerText += result;
        if (i<date_.length-1) ctp.innerText += '/';
    }
}
function loadMeal(){
    resetMealText();
    getJSON('/api/meal?day='+date, function(error, js){
        if (error !== null) {console.log("Error");}
        else {
            morning.innerHTML = "";
            lunch.innerHTML = "";
            dinner.innerHTML = "";
            if (js["result"]){
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
            } else {
                for (var l=0; l<3; l++){
                    const t = document.createElement("p");
                    t.innerText = "급식 정보가 없습니다.";
                    if (l===0) morning.append(t);
                    else if (l===1) lunch.append(t);
                    else if (l===2) dinner.append(t);
                }
            }
        }
    });
}