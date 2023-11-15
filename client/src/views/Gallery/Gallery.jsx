import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";
import SearchBar from './Search';
import FilterComponent from './FilterComponent';
//testing GalleryItems
import testings from "./testing";
import { getGalleryObjects } from '../../Utils/requests';


const Gallery = () => {

    const [filterText, setFilterText] = useState("");
    const [galleryObjects, setGalleryObjects] = useState(undefined);

    useEffect(() => {
        getGalleryObjects().then((response) => {
            setGalleryObjects(response.data);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    function filterUpdate(value) {
        setFilterText(value);
    }

    let testing = testings;

    const [galleryItems, setGalleryItems] = useState(undefined);
    window.galleryObjects = galleryObjects;

    const x = Math.min(12, galleryObjects?.length || 0);

    useEffect(() => {
        let tempItems = [];
        try {
            for (let i = 0; i < x; i++) {
                const it = galleryObjects[i];
                tempItems.push(<GalleryItem key={it.id} Title={it.Title} User_name={it.User_name} like_count={it.like_count} view_count={it.view_count} posted={it.updated_at} />);
            }
        } catch (e) {
            console.log("Not enough items in galleryItems");
            console.log(e);
            console.log(tempItems);
        }
        setGalleryItems(tempItems);
    }, []);



    testing = testing.filter((records) => {
        return records.User_name.toLowerCase().includes(filterText.toLowerCase()) || records.Title.toLowerCase().includes(filterText.toLowerCase());
    });

    //Detect if the project is clicked. 
    //should change the red block to the img of galleryItem in the future.
    const recordList = testing.map((directory) => {
        return (
            <div key={directory.Id}>
                <GalleryItem item={directory}
                    Id={directory.Id}

                />
            </div>
        );
    });




    return (
        <>
            <NavBar />
            <div className='container nav-padding'>
                <h1>Gallery</h1>
                <SearchBar filterUpdate={filterUpdate} />
                <div className='flex flex-row'>
                    <FilterComponent />
                    {galleryItems}
                </div>
            </div>
        </>
    );
}

export default Gallery;