import { useState } from 'react';
import './App.css';
import Definition from './components/Definition';
import NoDefinition from './components/NoDefinition';

function App() {
  const [meaning, setMeaning] = useState({});
  const [error, setError] = useState("");

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  const fetcher = (e) => {
    const word = e.target.value;

    if (e.key === "Enter") {
      return fetch(url + word)
      .then(response => {
        console.log(response)

        if (response.ok) {
          return response.json();
        } else {
          throw new Error("No Definitions Found!");
        }
      })
      .then((data) => {
        setMeaning(data);
        setError("");
        console.log(Object.keys(meaning).length > 0);
        console.log(data);
        e.target.value="";
      })
      .catch(err => {
        setError(err)
        setMeaning("");
        e.target.value="";
      })
    }

  }
  
  return (
    <div className="App">
      <div className="search-header">
        <h1 id='title'><span>W</span>ik<span>i</span> <span>S</span>earc<span>h</span></h1>
        <input 
        type="search" 
        placeholder="Search for any word.."
        className="input-search"
        onKeyDown={(e) => fetcher(e)}
        ></input>
      </div>

      <header className="App-header">
        {error && 
          <NoDefinition /> }

        {Object.keys(meaning).length > 0 && <Definition name={meaning[0]}/>}
      </header>
    </div>
  )
}

export default App;
