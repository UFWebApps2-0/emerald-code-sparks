import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";


const Gallery = () => {

    return (
        <>
            <NavBar />
            <div className='container nav-padding'>
                <h1>Gallery</h1>
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <GalleryItem title="Project Name" />
                    </div>
                    <div className='flex flex-column'>
                        <GalleryItem title="Second Project Name" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Gallery;