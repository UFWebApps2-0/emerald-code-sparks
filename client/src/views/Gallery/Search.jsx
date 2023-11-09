import { useRef } from 'react';

//modified from the bootcamp3 search
function Search({ filterUpdate }) 
{
   const input = useRef(null); 

  function handleChange()
  {
	  filterUpdate(input.current.value); 
  }

  return (

    <form>
      <input 
        type="text"
        placeholder="Search GalleryItems"
		onChange={handleChange}
        ref={input}
      />
    </form>
	
  );
} 
console.log("Search .jsx the end"); /////////////////
export default Search;


/*
Search.jsx: In this file you will

Capture the text that is typed into the text box and store this value using the filterUpdate() function
Use the onChange listener function
Note: You will need to understand how to use ref values from form inputs


*/
