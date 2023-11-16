import { postGalleryObject } from '../../../Utils/requests';

async function createGalleryObject(title, user_name, like_count, view_count, visibility, type) {

  //starts with empty discussion board
  const discussion_board = [];

    const data = {
    Title: title, 
    User_name: user_name,
    like_count: like_count,
    view_count: view_count,
    discussion_board: discussion_board,
    visibility: visibility,
    type: type,
  };

  console.log(data)

 try {
      const response = await postGalleryObject(data);

      console.log('response: ', response.err)

      if (response.err == null) {
        console.log('Gallery object created successfully in the backend.');
      } else {
        console.error('Failed to create the gallery object in the backend.');
      }
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
}

export default createGalleryObject;
