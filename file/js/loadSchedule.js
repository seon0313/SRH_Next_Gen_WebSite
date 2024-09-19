var grade = document.getElementById("grade_");
var class_ = document.getElementById("class_");
var item = document.getElementById("class_item");

function loadSchedule(){
    var v1 = grade.options[grade.selectedIndex].text;
    var v2 = class_.options[class_.selectedIndex].text;
    var date = new Date().toLocaleDateString("ja-JP").replaceAll('/','');
    var url = '/api/schedule?day='+date+'&grade=' + v1+'&class='+v2;
    getJSON(url, function(error, js){
        if (error !== null) {console.log("Error");}
        else {
            console.log(js);
            item.innerHTML = "";
            if (js['result']){
                var a = js['schedule'];
                for (var l=0; l<Object.keys(a).length; l++){
                    t = document.createElement("p");
                    t.innerText = js['schedule'][l]['time']+' |\t\t'+js['schedule'][l]['name'];
                    item.append(t);
                }
            } else {
                t = document.createElement("p");
                t.innerText = '휴일인가봐요! 등록된 시간표가 없습니다.';
                item.append(t);
            }
        }
    });
}