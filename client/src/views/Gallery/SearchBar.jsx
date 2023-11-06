import React, {useState} from 'react'
import './SearchBar.less';


const SearchBar = (props) => {
    return (

        <form>
          <input 
            type="text"
            placeholder="Type to Filter"
          />
        </form>
      );
}

export default SearchBar ;