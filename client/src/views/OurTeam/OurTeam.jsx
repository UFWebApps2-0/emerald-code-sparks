import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import "./OurTeam.less"

export default function OurTeam(props) {
  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="about-content-container">
        <h1 id="title">Our Team</h1>
        <div id="logos" className="flex space-between">
        </div>
        <p>
          The following team members from the University of Florida have
          contributed to the design, development, and evaluation of the CASMM
          application:
          <br />
          <br />
          Dr. Sharon Chu
          <br />
          Dr. Christina Gardner-McCune
          <br />
          Pedro Feijóo-García
          <br />
          Sarah Brown
          <br />
          Nicholas Ionata
          <br />
          Dakota Rennemann
          <br />
          Megha Nagarmunoli
          <br />
          Adam Tamargo
          <br />
          Gus Segovia
          <br />
          Lily Hinkeldey
          <br />
          Siyu Chen
          <br />
          Anna Le
          <br />
          Yerika Jimenez
          <br />
          Siyu Chen
          <br />
          Michael Pascuzzi
          <br />
          David Magda
        </p>
      </div>
    </div>
  )
}