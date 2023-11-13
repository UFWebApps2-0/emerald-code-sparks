import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import "./HowItWorks.less"

export default function HowItWorks(props) {
  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="about-content-container">
        <h1 id="title">How It Works</h1>
        <div id="logos" className="flex space-between">
        </div>
        <p>
        CASMM makes use of Google's Blockly JavaScript library to build a block based 
        visual programming editor within our user interface. Programs created through 
        the visual programming editor can be compiled into Arduino executable code and 
        uploaded directly onto a students Arduino. These programs, once uploaded to the student's 
        Arduino, provide support in performing a corresponding science project in the classroom. 
        </p>
      </div>
    </div>
  )
}
