import React, {useState} from 'react'
import './SearchBar.less';


const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('projectName'); // Default filter option

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      // Call your filtering function here with searchTerm and filterBy
      console.log('Filtering by', filterBy, 'for', searchTerm);
    };

    const handleFilterChange = (event) => {
      setFilterBy(event.target.value);
    };
    return (

      <form>
      <input
        type="text"
        placeholder="Type to Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={filterBy} onChange={handleFilterChange}>
        <option value="projectName">Project Name</option>
        <option value="creatorName">Creator Name</option>
        <option value="date">Date</option>
      </select>
      </form>
      );
}

export default SearchBar ;