





function getShift(){
// create a current timestamp
var date = new Date();
var time = date.getHours();

// Get the Current Weekday
var day = date.getDay();
var weekday = new Array(7);

weekday[1]= 'mon';
weekday[2]= 'tue';
weekday[3]= 'wed';
weekday[4]= 'thur';
weekday[5]= 'fri';
weekday[6]= 'sa';
weekday[7]= 'sun';
// Current Weekday
var finalday = weekday[day];

// Get Current Shift
var shift;

if(time >= 9 && time <= 13){
    shift = 'first'
}
else if(time > 13 && time <= 16){
    shift = 'second'
}
else if (time > 16 && time <= 19){
    shift = 'third'
}
else{
    shift = 'out of shift'
}



// Produce Output
var finalTimeStamp = finalday + shift



return finalTimeStamp



}


export default getShift 