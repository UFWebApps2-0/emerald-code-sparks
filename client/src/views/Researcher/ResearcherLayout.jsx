import React from "react"
import { Outlet } from "react-router-dom"
import ResearcherNavbar from "./ResearcherNavbar";
import '../../../src/assets/style.less';

const ResearcherLayout = () => {
    return(
        <div className='container nav-padding'>
            <ResearcherNavbar/>
            <Outlet/>
        </div>
    )
}

export default ResearcherLayout;