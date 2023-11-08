import {useRef, useEffect} from "react";
import React from "react"

let input_value = ""
function Search({filterUpdate}) {
  // TODO: Update the input variable to use the useRef() hook
  const input = useRef("defualt");
  function handleChange() {
    // TODO: Update the value of the filter with the input from the textbox
    // Hint: You will need to use the "current" property of the input variable //----------------------------------------------maybe done to here?  
    filterUpdate(input.current.value);
    window.text_input = input.current.value;
  }

  return (
    // TODO: Add a ref attribute to the input tag
    // TODO: Add an onChange attribute to the input tag   <form onSubmit={HandleSubmit}>
    <form> 
      <textarea
        ref = {input}
        placeholder="C++ code here"
        onChange = {() => handleChange()}
      />
    </form>
  );
}
export{
  Search,
  input_value,
}
//export default Search;
//export default search_value input.current.value;