const StudyCard = ({ Study, items, addItem, removeItem }) => {
	const [searchTerm, setSearchTerm] = useState('');
  
	const handleSearchChange = (e) => {
	  setSearchTerm(e.target.value);
	};
  
	const handleSearchKeyDown = (e) => {
		if (e.key === 'Enter' && e.target.value) {
		  const enteredTag = e.target.value;
		  const existingTag = filteredOptions.includes(enteredTag);
		  const alreadyAdded = items.includes(enteredTag);
		  if (existingTag && !alreadyAdded) {
			addItem(Study, enteredTag);
			e.target.value = '';
		  }
		}
	  };
  
	const filteredOptions = [
	  'Individual',
	  'Group',
	  'Extra',
	  // Add more options as needed
	].filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  
	return (
	  <div>
		<h2>{Study}</h2>
		<ul>
		  {items.map((item, index) => (
			<StudyTag key={index} Study={Study} Tag={item} removeItem={removeItem} />
		  ))}
		</ul>
		<input
		  type="text"
		  placeholder="Search tags..."
		  onChange={handleSearchChange}
		  onKeyDown={handleSearchKeyDown}
		/>
		<select
		onChange={(e) => {
			const selectedTag = e.target.value;
			if (selectedTag) {
			const alreadyAdded = items.includes(selectedTag);
			if (!alreadyAdded) {
				addItem(Study, selectedTag);
			}
			}
		}}
		>
		{filteredOptions.map((option) => (
			<option key={option} value={option}>
			{option}
			</option>
		))}
		</select>
	  </div>
	);
};