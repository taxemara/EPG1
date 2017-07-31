var CHANNELS_ROW = 5;
var ChannelsId = new Array();
var CurrRow = 0;
var Currentcolumn=0;
var CUR_TIMESTAMP=1484884800//GMT: Fri, 20 Jan 2017 09:00:00 GMT

let promise = new Promise((resolve, reject) => {
    resolve("OK");
  });
  
  
  document.addEventListener("DOMContentLoaded", function(event) { 
    CalcTime();    
    
    setInterval(() => {
    promise.then(
      result => {
        CalcTime();

    },
    error => {
      console.log(" Looks like there was a problem with CalcTime");
    }
  );
 }, 30000);
    promise.then(CreateMainContainer());
    promise.then(CalcDay());
    promise.then(document.getElementById("DownButton").addEventListener("click", RowDown))
    promise.then(document.getElementById("UpButton").addEventListener("click", RowUp))
    promise.then(document.getElementById("leftButton").addEventListener("click", ShiftLeft))
    promise.then(document.getElementById("RightButton").addEventListener("click", ShiftRight))
    promise.then(document.getElementById("GreenButton").addEventListener("click", SetNowPositionClick))
    
    
   
});



var CreateMainContainer = () => {
    for (var i = 0; i <= CHANNELS_ROW; i++) {
        var MainDiv = document.createElement('div');
        MainDiv.id = 'Channels_' + i;
        MainDiv.className = "channels";
        document.getElementById("FirstLayer").appendChild(MainDiv);
    }
}

//Создает DIV каналов
var CreateChannelsDiv = () => {
    for (var i = 0; i <= CHANNELS_ROW; i++) {
        var MainDiv = document.createElement('div');
        var SecondMainDiv=document.createElement('div');
        MainDiv.id = 'ChName_' + i;
        MainDiv.className = "ChName";
        MainDiv.style.width="150px";
        MainDiv.style.background=" #4f4d4d";
        MainDiv.style.textAlign="center";
        MainDiv.style.display="inline-block";
        MainDiv.style.whiteSpace="nowrap";
        MainDiv.style.padding="25px";
        MainDiv.style.margin="0px 20px 0 0";
        MainDiv.style.overflow="visible";
        MainDiv.innerHTML = (JData.collection[i+CurrRow].title);
        SecondMainDiv.innerHTML = (JData.collection[i+CurrRow].title);
        SecondMainDiv.className="MainChannels";
        SecondMainDiv.id='MainChannels_'+i; 
        SecondMainDiv.onmouseover = function() {
            ShowNotice(this.id);
        }
        SecondMainDiv.onmouseout = function() {
            HideNotice(this.id);
        }
        document.getElementById("Channels_" + i).appendChild(MainDiv);
        
        
        document.getElementById("channels1").appendChild(SecondMainDiv);
        
    }
}

//Дискрипшены под каналами
var CreateDescr = () => {
    for (var i = 0; i <= CHANNELS_ROW; i++) {
        var DescripChannels = document.createElement('div');
        DescripChannels.id = 'DescrName_' + i;
        DescripChannels.className = "decription";
        DescripChannels.innerHTML = (JData.collection[i+CurrRow].description);
        DescripChannels.style.display = "none";
        
        document.getElementById("MainChannels_" + i).appendChild(DescripChannels);
    }
}

//Создание DIV программ //Сравнивает ID каналов и программ, и заполняет програмы.
var CreateProgDiv = () => {


var count=0;
 
    for (var j = CurrRow; j < PData.collection.length; j++) {
        for (var k = 0; k <= CHANNELS_ROW; k++) {
            switch (PData.collection[j].channel_id) {
                case ChannelsId[k + CurrRow]:
                    count+=1;
                    var ProgramDiv = document.createElement('div');
                    ProgramDiv.className = "programs";
                    ProgramDiv.style.width = PData.collection[j].duration / 60*20;
                    ProgramDiv.innerHTML = StartEndTime(j) + PData.collection[j].title;
                    ProgramDiv.id = ("programs" + j);
                    ProgramDiv.style.padding = "25px";
                    ProgramDiv.style.background = "#4f4d4d";
                    ProgramDiv.style.textAlign = "left";
                    ProgramDiv.style.display = "inline-block";
                    ProgramDiv.style.overflow = "visible";
                    ProgramDiv.style.whiteSpace = "nowrap";
                    ProgramDiv.style.margin = "10px 10px 0 0";
                    
                    ProgramDiv.onmouseover = function() {
                        ShowDescr(this.id);
                    }
                    ProgramDiv.onmouseout = function() {
                        HideDescr(this.id);
                    }
                    document.getElementById("Channels_"+k).appendChild(ProgramDiv);
                    break;
            }
          
        }
        
    }









};


var CreateCollection = () => {
    for (var i = 0; i < JData.collection.length; i++) {
        ChannelsId[i] = JData.collection[i].epg_channel_id;
    }
};





var ShowNotice = (tmp) => {
    tmp = "DescrName_" + tmp.substr(13);
    document.getElementById(tmp).style.display = "block";
};

var HideNotice = (tmp) => {
    tmp = "DescrName_" + tmp.substr(13);
    document.getElementById(tmp).style.display = "none";

};


//Возвращает время начало и конца передачи
var StartEndTime=(number)=>{
    
      var TimeStart=new Date;
    var TimeEnd=new Date;
     TimeStart.setTime(PData.collection[number].start*1000);
        TimeEnd.setTime((PData.collection[number].start+PData.collection[number].duration)*1000);
        
       if (TimeStart.getHours()>=10)
            var hr_st = TimeStart.getHours();
            else
            hr_st="0"+TimeStart.getHours();
            
        if (TimeStart.getMinutes()>=10)
            var min_st = TimeStart.getMinutes();
            else
            min_st = "0"+TimeStart.getMinutes();
            
        if (TimeEnd.getHours()>=10)
            var hr = TimeEnd.getHours();
            else
            hr="0"+TimeEnd.getHours();
            
        if (TimeEnd.getMinutes()>=10)
            var min = TimeEnd.getMinutes();
            else
            min = "0"+TimeEnd.getMinutes();
    return(hr_st+":"+min_st+"-"+hr+":"+min+" ");
    
};


//Вазвращает минимальный таймштамп
var MinProgs=()=>{
    
    var MinStamp=PData.collection[0].start;
    for (var i=0;i<PData.collection.length;i++){
        if (PData.collection[i].start < MinStamp) MinStamp = PData.collection[i].start;
    }
    return(MinStamp);

    };

//Показать описание программ
    var ShowDescr = (tmp) => {
        //console.log(tmp.substr(8));
        document.getElementById("ProgramDescription").style.display = "inline-block";
        document.getElementById("ProgramDescription").innerHTML = StartEndTime(tmp.substr(8)) + PData.collection[tmp.substr(8)].program.description;
    };

//Скрыть описание программ
    var HideDescr = (tmp) => {
        document.getElementById("ProgramDescription").style.display = "none";
    };
    

//Перемещение вниз
var RowDown = ()=> {
    Currentcolumn=0;
     document.getElementById("RedLine").style.display="block";
    if(CurrRow===ChannelsId.length-CHANNELS_ROW+1){
        alert("Вы уже в конце!");
    }else{
        CurrRow+=1;
        for (var i = 0; i <= CHANNELS_ROW; i++) {
            document.getElementById("Channels_" + i).remove();
            document.getElementById("MainChannels_" + i).remove();
     }
    CreateMainContainer();
    CreateChannelsDiv();
    CreateProgDiv();
    CreateDescr();
    SetTime();
    SetNowPosition();

    }
  };



//перевещение вверх
var RowUp=()=>{
    Currentcolumn=0;
     document.getElementById("RedLine").style.display="block";
    if(CurrRow===0){
     alert("Вы уже в начале списка!");   
    }else{
        CurrRow-=1;
            for (var i = 0; i <= CHANNELS_ROW; i++) {
                
                 document.getElementById("Channels_" + i).remove();
                 document.getElementById("MainChannels_" + i).remove();
                 
            }
        CreateMainContainer();
        CreateChannelsDiv();
        CreateProgDiv(); 
        CreateDescr();
        SetTime();
        SetNowPosition();

    }
        
}

//Устанавливает нулевое время
var SetTime=()=>{
 var CurrentNodes;
  for (var i = 0; i <= CHANNELS_ROW; i++) {
      
 CurrentNodes=document.getElementById("Channels_"+i).childNodes[1].id;
 var margin=PData.collection[CurrentNodes.substr(8)].start-MinProgs();//Текущий таймпштамп - минимальный
 document.getElementById(CurrentNodes).style.marginLeft=margin/3;

 
  }
  
  // document.getElementById("RedLine").style.marginLeft=((CUR_TIMESTAMP-MinProgs())/3)+"px";
}


var BuildTimeLine=()=>{
 var h =2, m=0;
    for(var i=0; i<40;i++){
        var ndiv = document.createElement('div');
         switch(m){
            case 0:{
                document.getElementById("TimeLine").appendChild(ndiv);
                ndiv.innerHTML=h+":"+m+"0";
                ndiv.style.width="600px";
                ndiv.style.color="white";
                ndiv.style.backgroundColor= "black";
                ndiv.style.height = "60px";
                ndiv.style.verticalAlign="middle";
                ndiv.style.border="5px solid black";
                ndiv.style.display="table-cell";
                m=3;
                break;
            }
            case 3:{
                document.getElementById("TimeLine").appendChild(ndiv);
                ndiv.innerHTML=h+":"+m+"0";
                ndiv.style.width="600px";
                ndiv.style.color="white";
                ndiv.style.backgroundColor= "black";
                ndiv.style.height = "60px";
                ndiv.style.verticalAlign="middle";
                ndiv.style.border="5px solid black";
                ndiv.style.display="table-cell";
                h+=1;
                m=0;
            }
        }
    }    
};




var ShiftLeft=()=>{
    Currentcolumn++;
    CheckRedLine();
    var CurrentNodes;
    var margin;
   
     for (var i = 0; i <= CHANNELS_ROW; i++) {
         CurrentNodes=document.getElementById("Channels_"+i).childNodes[1].id;
         margin = parseInt(getComputedStyle(document.getElementById(CurrentNodes)).marginLeft);
         document.getElementById(CurrentNodes).style.marginLeft=margin+1200;
       
     }
     
     margin = parseInt(getComputedStyle(document.getElementById("TimeLine")).marginLeft);
      document.getElementById("TimeLine").style.marginLeft=margin+1200;

};
    
 
    


var ShiftRight=()=>{
    Currentcolumn--;
     CheckRedLine();
    var CurrentNodes;
    var margin;
  
     for (var i = 0; i <= CHANNELS_ROW; i++) {
         
         CurrentNodes=document.getElementById("Channels_"+i).childNodes[1].id;
         margin = parseInt(getComputedStyle(document.getElementById(CurrentNodes)).marginLeft);
         document.getElementById(CurrentNodes).style.marginLeft=margin-1200;
     }
     margin = parseInt(getComputedStyle(document.getElementById("TimeLine")).marginLeft);
      document.getElementById("TimeLine").style.marginLeft=margin-1200;
    document.getElementById("FirstLayer").style.clip= "rect(auto, auto, auto, 10px)";
   
}


var SetNowPosition=()=>{
  
  
  document.getElementById("TimeLine").style.marginLeft=430;
    var CurrentNodes;
    var margin;
     for (var i = 0; i <= CHANNELS_ROW; i++) {
         CurrentNodes=document.getElementById("Channels_"+i).childNodes[1].id;
         margin = parseInt(getComputedStyle(document.getElementById(CurrentNodes)).marginLeft);
         document.getElementById(CurrentNodes).style.marginLeft=margin-1200*parseInt((CUR_TIMESTAMP-MinProgs())/3/1200, 10);
     }
      margin = parseInt(getComputedStyle(document.getElementById("TimeLine")).marginLeft);
      document.getElementById("TimeLine").style.marginLeft=margin-1200*parseInt((CUR_TIMESTAMP-MinProgs())/3/1200, 10);
      document.getElementById("FirstLayer").style.clip= "rect(auto, auto, auto, 10px)";
 
    
} 


var SetNowPositionClick=()=>{
 Currentcolumn=0;
     document.getElementById("RedLine").style.display="block";
    document.getElementById("TimeLine").style.marginLeft=430;
     var CurrentNodes, tmp, tmp2;
    var margin;
    
  
  SetTime();
    
     for (var i = 0; i <= CHANNELS_ROW; i++) {
         CurrentNodes=document.getElementById("Channels_"+i).childNodes[1].id;
         margin = parseInt(getComputedStyle(document.getElementById(CurrentNodes)).marginLeft);
         document.getElementById(CurrentNodes).style.marginLeft=margin-1200*parseInt((CUR_TIMESTAMP-MinProgs())/3/1200, 10);
     }
      margin = parseInt(getComputedStyle(document.getElementById("TimeLine")).marginLeft);
      document.getElementById("TimeLine").style.marginLeft=margin-1200*parseInt((CUR_TIMESTAMP-MinProgs())/3/1200, 10);
      document.getElementById("FirstLayer").style.clip= "rect(auto, auto, auto, 10px)";
 
   
}

var CheckRedLine=()=>{
    
  
    
    var CurrentMargin=parseInt(getComputedStyle(document.getElementById("TimeLine")).marginLeft, 10);
   
    var CurrentTimestamp= parseInt((CUR_TIMESTAMP-MinProgs())/3, 10);
    Math.abs(CurrentMargin);
    console.log(CurrentMargin, CurrentTimestamp);
 
    if(Currentcolumn===0 ){
        document.getElementById("RedLine").style.display="block";
        
    }else {
        document.getElementById("RedLine").style.display="none";
    }
    

    
}

