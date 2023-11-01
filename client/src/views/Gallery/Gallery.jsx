import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";


const Gallery = () => (
    <div className='container nav-padding'>
        <NavBar />
        <h1>Gallery</h1>
        <GalleryItem />
    </div>
)

export default Gallery;