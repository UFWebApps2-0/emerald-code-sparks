import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";
import SearchBar from './SearchBar';
import FilterComponent from './FilterComponent';

const Gallery = () => {

    return (
        <>
            <NavBar />
            <div className='container nav-padding'>
                <h1>Gallery</h1>
                <SearchBar/>
                <div className='flex flex-row'>
                    <FilterComponent/>
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