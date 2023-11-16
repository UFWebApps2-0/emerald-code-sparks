import { postGalleryObject } from '../../Utils/requests';

async function createGalleryObject(title, user_name, like_count, view_count, visibility, type) {

  //**********create default discussion board here
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
      console.log("please omg", data)
      const response = await postGalleryObject(data);

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
