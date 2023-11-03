import React, { useState } from 'react';

class Gallery {
    constructor(name) {
        this.name = name;
        this.like_count = 0;
    }

    like_feature() {
        if (this.isClicked) {
            if (!this.isLiked) {
                // Display filled heart icon
                this.like_count++;
            } else {
                // Display empty heart icon
                this.like_count--;
            }
        }
    }
}

function App() {
    const [galleries, setGalleries] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAddGallery = () => {
        setGalleries([...galleries, new Gallery(input)]);
        setInput('');
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter Gallery name"
            />
            <button onClick={handleAddGallery}>Add Gallery</button>
            <ul>
                {galleries.map((gallery, index) => (
                    <li key={index}>
                        {gallery.name}
                        <button
                            onClick={() => {
                                gallery.isClicked = !gallery.isClicked;
                                gallery.like_feature();
                                setGalleries([...galleries]);
                            }}
                        >
                            Like
                        </button>
                        Likes: {gallery.like_count}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
