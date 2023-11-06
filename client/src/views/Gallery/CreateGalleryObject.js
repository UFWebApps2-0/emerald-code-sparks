async function createGalleryObject(title, user_name, like_count, view_count, discussion_board) {
  const data = {
    title, 
    user_name,
    like_count,
    view_count,
    discussion_board,
  };

  try {
    const response = await fetch('http://172.18.0.3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      console.log('Gallery object created successfully in the backend.');
    } else {
      console.error('Failed to create the gallery object in the backend.');
    }
  } catch (error) {
    console.error('Error making the POST request:', error);
  }
}

// Call the function to create the gallery object in the backend
export default createGalleryObject();
