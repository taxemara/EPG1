var CalcTime = () => {
var time = new Date;
var day= ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
var month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
var minutes = time.getMinutes();
if (minutes <10 ){
    minutes="0" + minutes;
}
 document.getElementById("clock1").innerHTML=(time.getDate()+ " " + month[time.getMonth()] + ", " + day[time.getDay()] );
 document.getElementById("clock2").innerHTML=(time.getHours()+":" + minutes );

};



var CalcDay=()=>{
var time = new Date;   
var day= ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];   
var CurDay = time.getDay();
var DayToday= new Array;
for (var i=0; i<=11;i++){
    if(i+CurDay-3<0){
        DayToday[i]=day[CurDay-3+7+i]
    }else{DayToday[i]=day[i+CurDay-3]};
}
DayToday[CurDay]="Сегодня";
DayToday[CurDay+1]="Завтра";
 document.getElementById("DayToday").innerHTML=(DayToday.join(' '));
}








