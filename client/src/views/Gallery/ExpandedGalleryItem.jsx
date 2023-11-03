import React from 'react';
import useState from 'react';
import './GalleryItem.less';


const ExpandedGalleryItem = () => {

    const [visible, setVisible] = useState(false);


    return (
            <div className={'galleryItem galleryItem-expanded'}>
                
            </div>
    )
    }

export default ExpandedGalleryItem;