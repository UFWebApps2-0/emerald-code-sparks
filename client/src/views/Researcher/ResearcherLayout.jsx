import React from "react"
import { Outlet } from "react-router-dom"
import ResearcherNavbar from "./ResearcherNavbar";

const ResearcherLayout = () => {
    return(
        <>
            <ResearcherNavbar/>
            <Outlet/>
        </>
    )
}

export default ResearcherLayout;