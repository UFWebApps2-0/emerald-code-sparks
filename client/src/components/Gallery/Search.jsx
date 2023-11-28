import { useState, useRef } from 'react';
import { debounce } from 'lodash';
import Input from 'antd/lib/input/Input';
import Form from 'antd/lib/form/Form';
import './Search.less';

function Search({ filterUpdate, loadedGalleryItems }) {
  //deboune lets us pause before doing the search to avoid unnecessary calls, improve performance
  const [debouncedFilterUpdate] = useState(() => debounce(filterUpdate, 1000));
  const input = useRef(null);

  const handleChange = () => {
    debouncedFilterUpdate(input.current.input.value, loadedGalleryItems);
  }

  return (
    <Form className='search-form'>
      <Input
        size='large'
        type="text"
        className='search-bar'
        placeholder="Search GalleryItems"
        onChange={handleChange}
        ref={input}
      />
    </Form>
  );
}
export default Search;