import { postGalleryObject } from '../../Utils/requests';

async function createGalleryObject(title, user_name, like_count, view_count, visibility, type) {

  //**********create default discussion board here
  const discussion_board = ['test'];

  const data = {
    title,
    user_name,
    like_count,
    view_count,
    discussion_board, // Make sure this variable is defined
    type,
    visibility,
  };

 try {
      const response = await postGalleryObject(JSON.stringify(data));

      if (response.status === 201) {
        console.log('Gallery object created successfully in the backend.');
      } else {
        console.error('Failed to create the gallery object in the backend.');
      }
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
}

export default createGalleryObject;
