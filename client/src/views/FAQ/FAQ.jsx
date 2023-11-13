import React, { useState } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import NavBar from "../../components/NavBar/NavBar"
import "./FAQ.less"


export default function FAQ(props) {
  return (
   <div className="container nav-padding">
    <NavBar />
    <div>
      <div className="accordion">
      <h1>FAQ</h1>
          <Accordion title={"Question 1"} content={"Answer to Question 1..."} />
          <p></p>
          <Accordion title={"Question 2"} content={"Answer to Question 2..."} />
          <p></p>
          <Accordion title={"Question 3"} content={"Answer to Question 3..."} />
          <p></p>
          <Accordion title={"Question 4"} content={"Answer to Question 4..."} />
          <p></p>
          <Accordion title={"Question 5"} content={"Answer to Question 5..."} />
      </div>
    </div>
   </div>
  )
}