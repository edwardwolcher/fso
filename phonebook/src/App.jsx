import React, { useState } from "react";

// Starting Data
const data = [
  {
    id: 1,
    name: "Clive Cat",
  },
];

// Utility Functions
const newId = () => Math.floor(Math.random() * 100000);

// Components
const Listing = ({ person }) => <li>{person.name}</li>;

const Directory = ({ persons }) => {
  return (
    <div>
      <h2>Directory</h2>
      <ul>
        {persons.map((person) => (
          <Listing key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

const Input = ({ value, setter }) => {
  const handleChange = (e) => {
    setter(e.target.value);
  };
  return <input value={value} onChange={handleChange} />;
};

const NewPerson = ({ addPerson }) => {
  const [newName, setNewName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const newPerson = {
      id: newId(),
      name: newName,
    };

    addPerson(newPerson);
    setNewName("");
  };

  return (
    <div>
      <h2>Add New Person</h2>
      <form onSubmit={submit}>
        <Input value={newName} setter={setNewName} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

const App = () => {
  const initialState = data;
  const [persons, setPersons] = useState(initialState);

  const addPerson = (person) => {
    const newPersons = [...persons, person];
    setPersons(newPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <NewPerson addPerson={addPerson} />
      <Directory persons={persons} />
    </div>
  );
};

export default App;
