import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";


const Gallery = () => (
    <>
        <NavBar />
        <div className='container nav-padding'>
            <h1>Gallery</h1>
            <div className='flex flex-column'>
                <GalleryItem />
            </div>
        </div>
    </>
)

export default Gallery;