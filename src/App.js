import { useState, useEffect } from 'react';

import CardList from './components/card-list/CardList';
import SearchBox from './components/search-box/SearchBox';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [title, setTitle] = useState('');
  const [robots, setRobots] = useState([]);
  const [filteredRobots, setFilterRobots] = useState(robots);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  useEffect(() => {
    const newFilteredRobots = robots.filter((robot) => { 
      return robot.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterRobots(newFilteredRobots);
  }, [robots, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>

      <SearchBox
        className='robots-search-box'
        onChangeHandler={onSearchChange}
        placeholder=' search robots'
      />
      <br />
      <SearchBox
        className='tittle-search-box'
        onChangeHandler={onTitleChange}
        placeholder=' set title'
      />
      <CardList robots={filteredRobots} />
    </div>
  )
}

export default App;
