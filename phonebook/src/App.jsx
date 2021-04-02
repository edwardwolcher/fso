import React, { useState, useEffect } from "react";
import axios from "axios";

// Data target
const dataUrl = "http://localhost:3001/directory";

// Utility Functions
const newId = () => Math.floor(Math.random() * 100000);
const formatElementId = (string) => string.replace(/[\W]/g, "").toLowerCase();

// Components
const Listing = ({ person }) => (
  <li>
    {person.name} ~ {person.number}
  </li>
);

const Directory = ({ personsDisplay }) => {
  return (
    <ul>
      {personsDisplay.map((person) => (
        <Listing key={person.id} person={person} />
      ))}
    </ul>
  );
};

const Input = ({ value, setter, type = "text", id = null }) => {
  const handleChange = (e) => {
    setter(e.target.value);
  };
  return <input type={type} id={id} value={value} onChange={handleChange} />;
};

const NewPersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addPerson,
}) => {
  const nameLabel = "Name: ";
  const nameId = "input-" + formatElementId(nameLabel);
  const numberLabel = "Number: ";
  const numberId = "input-" + formatElementId(numberLabel);
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor={nameId}>{nameLabel}</label>
        <Input value={newName} setter={setNewName} id={nameId} />
      </div>
      <div>
        <label htmlFor={numberId}>Number:</label>
        <Input value={newNumber} setter={setNewNumber} id={numberId} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

const SearchField = ({ searchTerm, setSearchTerm }) => {
  const searchFieldLabel = "Filter Directory: ";
  const searchFieldId = "input-searchfield";
  return (
    <div>
      <label htmlFor={searchFieldId}>{searchFieldLabel}</label>
      <Input value={searchTerm} setter={setSearchTerm} id={searchFieldId} />
    </div>
  );
};

// App
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(dataUrl);
      setPersons(response.data);
    };
    fetchData();
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} already in directory`);
      return;
    }
    const newPerson = {
      id: newId(),
      name: newName,
      number: newNumber,
    };
    const newPersons = [...persons, newPerson];
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  };

  const personsDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add Person</h2>
      <NewPersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h2>Directory</h2>
      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Directory personsDisplay={personsDisplay} />
    </div>
  );
};

export default App;
