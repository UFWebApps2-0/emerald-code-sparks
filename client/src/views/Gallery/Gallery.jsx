import React, { useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import GalleryItem from "./GalleryItem";
import Search from "./Search";
// This one should be changed to the real GalleryItem data in the future.
import viewCountsRecord from "./viewCountsRecord";

function Gallery({ viewCountsRecords }) {
  const [filterText, setFilterText] = useState("");

  function filterUpdate(value) {
    setFilterText(value);
  }

  return (
    <>
      <NavBar />
      <div className='container nav-padding'>
        <h1>Gallery</h1>
        <Search filterUpdate={filterUpdate} />
        <div className='flex flex-column'>
          <GalleryItem filterText={filterText} viewCountsRecord={viewCountsRecord} />
        </div>
      </div>
    </>
  );
}

export default Gallery;
