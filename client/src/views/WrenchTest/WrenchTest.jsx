import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
//import ActionButtons from "../../components/Moderation/ActionButtons"
import WrenchButton from "../../components/Moderation/WrenchButton";
import "./WrenchTest.less"

export default function WrenchTest () {
    const num = 5;
    return (
        <div className='container nav-padding'>
            <NavBar />
            <WrenchButton uniqueKey={num}/>
            
        </div>
    )
}
