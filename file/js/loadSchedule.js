var grade = document.getElementById("grade_");
var class_ = document.getElementById("class_");
var item = document.getElementById("class_item");

function loadSchedule(){
    var v1 = grade.options[grade.selectedIndex].text;
    var v2 = class_.options[class_.selectedIndex].text;
    var url = '/api/schedule?day=20240920&grade=' + v1+'&class='+v2;
    getJSON(url, function(error, js){
        if (error !== null) {console.log("Error");}
        else {
            console.log(js);
            var a = js['schedule'];
            for (var l=0; l<Object.keys(a).length; l++){
                t = document.createElement("p");
                t.innerText = js['schedule'][l]['time']+' |\t\t'+js['schedule'][l]['name'];
                item.append(t);
            }
        }
    });
}