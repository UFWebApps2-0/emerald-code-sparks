import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";
import SearchBar from './Search';
import FilterComponent from './FilterComponent';
//testing GalleryItems
import { getGalleryObjects } from '../../Utils/requests';


const Gallery = () => {

    function filterUpdate(value) {
        const filteredGalleryItems = loadedGalleryItems?.filter((item) => {
            return item.props.Title.toLowerCase().includes(value.toLowerCase()) || item.props.User_name.toLowerCase().includes(value.toLowerCase());
        });
        setRenderedGalleryItems(filteredGalleryItems);
    }

    /*The gallery page will need to have lazy loading implemented
    Therefore, we need to store ALL gallery objects, all which have been loaded (for searching), 
    and all which are being rendered
    */
    const [galleryObjects, setGalleryObjects] = useState(undefined);
    const [renderedGalleryItems, setRenderedGalleryItems] = useState(undefined);
    const [loadedGalleryItems, setLoadedGalleryItems] = useState(undefined);

    useEffect(() => {
        getGalleryObjects().then((response) => {
            setGalleryObjects(response.data);
            //Convert gallery objects into JSX gallery items
            //x is the max number of gallery items to display on load
            const x = Math.min(12, response.data?.length || 0);
            let tempItems = [];
            try {
                for (let i = 0; i < x; i++) {
                    const it = response.data[i];
                    tempItems.push(<GalleryItem key={it.id} Title={it.Title} User_name={it.User_name} like_count={it.like_count} view_count={it.view_count} posted={it.updated_at} />);
                }
            } catch (e) {
                console.log("Error in gallery objects");
                console.log(e);
                console.log(tempItems);
            }
            setLoadedGalleryItems(tempItems);
            setRenderedGalleryItems(tempItems);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <>
            <NavBar />
            <div className='container nav-padding'>
                <h1>Gallery</h1>
                <SearchBar filterUpdate={filterUpdate} />
                <div className='flex flex-row'>
                    <FilterComponent />
                    {renderedGalleryItems}
                </div>
            </div>
        </>
    );
}

export default Gallery;