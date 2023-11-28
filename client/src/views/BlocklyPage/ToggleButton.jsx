import React, { useEffect } from "react";
import {message} from "antd"
import arrow from './arrow.svg'

export default function attachButton(){

useEffect(() => {

    var BTN = document.getElementById("ToggleButton");
    var Arrow = document.getElementById("Arrow");

    BTN.style.position = 'absolute';
    //message.info("Hello");


    BTN.style.height = 50 + 'px';
    BTN.style.top = 140 + 'px';
    BTN.style.left = 135 + 'px';
    BTN.style.width = 50 + 'px';
    BTN.style.border = 0 + 'px';

    //Arrow.style.background = 'transparent';
    BTN.style.background = 'transparent';

})


var toolBoxActive = true;
  var id = null;
  function toggleToolBox(){

    var BTN = document.getElementById("ToggleButton");

    message.info("Triggered collapse!");

    var toolBox = document.getElementsByClassName("blocklyToolboxDiv");

    //message.info(toolBox);

    clearInterval(id);
    id = setInterval(frame, .5);
    var width = 0;

    if(toolBoxActive){
      width = 95;
      //need to retract the toolbox into the left side of the screen
      //toolBox.style.left = 
    }
    else{
      width = 0;
      //need to extend the toolbox into the screen
    }

    
    if(toolBoxActive){
        targetRotation = 180;
    }
    else{
        targetRotation = 360;
    }
    rotateID = setInterval(rotate, 1);


    function frame(){
      //message.info(width);
    if(toolBoxActive){
      if(width <= 0){

        toolBoxActive = false;

        clearInterval(id);
      }
        
      width -= 2;
      toolBox[0].style.width = width + 'px';
      //need to retract the toolbox into the left side of the screen
      //toolBox.style.left = 

      //adjust the position of the arrow
      
    }
    else{
      if(width >= 95){
        toolBoxActive = true;
        clearInterval(id);
      }
        
      width += 2;
      toolBox[0].style.width = width + 'px';

      
      //need to extend the toolbox into the screen
      
    }
    BTN.style.left = 40 + width + 'px';
  }

}

var rotateID = null;
var targetRotation = 0;
var rotation = 0;

function rotate(){

    var Arrow = document.getElementById("Arrow");
    Arrow.style.transform = 'rotate(' + rotation + 'deg)';
    rotation += 5;
    if(rotation >= targetRotation){
        Arrow.style.transform = 'rotate(' + rotation + 'deg)';
        clearInterval(rotateID);
        if(rotation >= 360)
            rotation = 0;

    }
    message.info(rotation);
}

return(
<button id="ToggleButton" onClick={toggleToolBox}><img id="Arrow" src={arrow}/></button>
)
}