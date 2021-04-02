import React, { useState, useEffect } from "react";
import directoryService from "./services/directory";

// Utility Functions
const newId = () => Math.floor(Math.random() * 100000);
const formatElementId = (string) => string.replace(/[\W]/g, "").toLowerCase();

// Components
const Listing = ({ person, removePerson }) => (
  <li>
    {person.name} ~ {person.number}{" "}
    <button
      onClick={() => {
        removePerson(person);
      }}
    >
      delete
    </button>
  </li>
);

const Directory = ({ personsDisplay, removePerson }) => {
  return (
    <ul>
      {personsDisplay.map((person) => (
        <Listing key={person.id} person={person} removePerson={removePerson} />
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
    directoryService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        alert("error communicating with server");
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already in directory`);
      return;
    }
    const newPersonObject = {
      id: newId(),
      name: newName,
      number: newNumber,
    };

    directoryService
      .create(newPersonObject)
      .then((response) => {
        const newPersons = [...persons, response.data];
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert("error adding person");
      });
  };

  const removePerson = (person) => {
    directoryService
      .remove(person.id)
      .then((response) => {
        const newPersons = persons.filter((p) => p.id !== person.id);
        setPersons(newPersons);
      })
      .catch((error) => {
        alert(`error deleting ${person.name}`);
      });
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
      <Directory personsDisplay={personsDisplay} removePerson={removePerson} />
    </div>
  );
};

export default App;
