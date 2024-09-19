const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date().toLocaleDateString("ja-JP").replaceAll('/','-');
var split_date = date.split('-');
var year = split_date[0];
var month = split_date[1];
var day = split_date[2];
function setDays(){
    split_date = date.split(' ');
    year = split_date[0];
    month = split_date[1];
    day = split_date[2];
}

function setYear(day_) {year=day_;}
function setMonth(day_) {month=day_;}
function setDay(day_) {day=day_;}

function setDate(){
    date = year + '-' + month + '-' + day;
}