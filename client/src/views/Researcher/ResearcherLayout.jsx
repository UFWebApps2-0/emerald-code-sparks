import React from "react"
import { Outlet } from "react-router-dom"

const ResearcherLayout = () => {
    return(
        <>
            <ResearcherNavbar/>
            <Outlet/>
        </>
    )
}

export default ResearcherLayout;