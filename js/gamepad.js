//=============================================== 
// Gamepad Agent
//=============================================== 
function mloop() {
  try {
    loop(); 
  } catch(eee) {
    //console.log(eee);
    gpok=false;
  } 
} 
var igamepad=0;
function loop() {
 if (! gpok) {
     document.body.style.backgroundColor="#AA0000";
     message("title","No Gamepad...");
     var gps= (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.getGamepads();
     message("title","Number of Gamepad: "+ gps.length);   
     igamepad=null;
     for (var i=0;i<gps.length;i++)
       if (gps[i].axes && gps[i].buttons && 
          gps[i].axes.length>=4 && gps[i].buttons.length>=4 &&
           gps[i].mapping=="standard") {
         igamepad=i;
         break;
     }
     if (! igamepad) { 
       message("title","gamepad not recognized !!")  ;
       igamepad=0;
     } else
       message("title",""+gps[igamepad].id, " mapping=", gps[igamepad].mapping)  ;

     setTimeout(function() {message("title","")},1800);
     document.body.style.backgroundColor="#333";
     gpok=true;
 }
 if (! gpok) return;
 
 // For Chrome, the gamePad object must be read at each access...
 gp=((navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.getGamepads())[igamepad];
 
 var abuttons=[0,0,0,0,0,0,0,0,0,0,0,0];
 for (var ib=0;ib<gp.buttons.length&&ib<abuttons.length;ib++) abuttons[ib]=gp.buttons[ib].pressed ? 1 : 0 ;
 
 var aaxes=[100,100,100,100,100,100] ;
 for (var ia=0;ia<gp.axes.length&&ia<aaxes.length;ia++) 
  aaxes[ia]=Math.round((1+gp.axes[ia])*100);
 doEvent([aaxes,abuttons]);
}


var idi=null;
function init_gamepad() {
 idi=setInterval(function() { mloop();},80);
};

function unload_gamepad() {
  if (idi) {
      clearInterval(idi);
      idi=null;
  }
}

