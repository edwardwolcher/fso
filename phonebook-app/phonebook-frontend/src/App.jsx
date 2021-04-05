import React, { useState, useEffect } from "react";
import directoryService from "./services/directory";
import "./app.css";

// Utility Functions
// const newId = () => Math.floor(Math.random() * 100000);
const formatElementId = (string) => string.replace(/[\W]/g, "").toLowerCase();

// Components

const Input = ({ value, setter, type = "text", id = null }) => {
  const handleChange = (e) => {
    setter(e.target.value);
  };
  return <input type={type} id={id} value={value} onChange={handleChange} />;
};

const Listing = ({ person, removePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button
        onClick={() => {
          removePerson(person);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const Directory = ({ personsDisplay, removePerson }) => {
  return (
    <table>
      <tbody>
        {personsDisplay.map((person) => (
          <Listing key={person.id} person={person} removePerson={removePerson} />
        ))}
      </tbody>
    </table>
  );
};

const NewPersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
  const nameLabel = "Name: ";
  const nameId = "input-" + formatElementId(nameLabel);
  const numberLabel = "Number: ";
  const numberId = "input-" + formatElementId(numberLabel);
  return (
    <form className="newPersonForm" onSubmit={addPerson}>
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

const MessageBox = ({ message }) => {
  return (
    <div className="message" data-state={message.type}>
      {message.text}
    </div>
  );
};

const SearchField = ({ searchTerm, setSearchTerm }) => {
  const searchFieldLabel = "Filter:";
  const searchFieldId = "input-searchfield";
  return (
    <div className="searchField">
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
  const [message, setMessage] = useState(null);

  const sendMessage = (text, type = "ok", duration = 5000) => {
    const newMessage = { text, type };
    setMessage(newMessage);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  useEffect(() => {
    directoryService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        sendMessage("error communicating with server", "error");
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const overwritePerson = persons.find((person) => person.name === newName);
    if (overwritePerson) {
      if (overwritePerson.number === newNumber) {
        sendMessage(`${newName} already in directory`, "error");
        return;
      }
      if (window.confirm(`${newName} already in directory, update number?`)) {
        const newPersonObject = { ...overwritePerson, number: newNumber };
        directoryService
          .update(newPersonObject.id, newPersonObject)
          .then((response) => {
            const newPersons = persons.filter((p) => p.id !== response.data.id);
            newPersons.push(response.data);
            setPersons(newPersons);
            setNewName("");
            setNewNumber("");
            sendMessage(`${response.data.name} added to directory`);
          })
          .catch((error) => {
            sendMessage("error updating database", "error");
          });
        return;
      }
      return;
    }

    const newPersonObject = {
      // id: newId(),
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
        sendMessage(`${response.data.name} added to directory`);
      })
      .catch((error) => {
        sendMessage(error.response.data.error, "error", 10000);
      });
  };

  const removePerson = (person) => {
    directoryService
      .remove(person.id)
      .then((response) => {
        const newPersons = persons.filter((p) => p.id !== person.id);
        setPersons(newPersons);
        sendMessage(`${person.name} removed from directory`);
      })
      .catch((error) => {
        alert(`error deleting ${person.name}`);
      });
  };

  const personsDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app flow">
      <h1>Phonebook</h1>
      {message && <MessageBox message={message} />}
      <div className="addPerson flow">
        <h2>Add Person</h2>
        <NewPersonForm
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          addPerson={addPerson}
        />
      </div>
      <div className="directory flow">
        <h2>Directory</h2>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Directory personsDisplay={personsDisplay} removePerson={removePerson} />
      </div>
    </div>
  );
};

export default App;
