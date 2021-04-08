import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  console.log(id);
  console.log(anecdotes);
  const anecdote = anecdotes.find((a) => Number(a.id) === Number(id));
  return <div>{anecdote.content}</div>;
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.attributes.value,
      author: author.attributes.value,
      info: info.attributes.value,
      votes: 0,
    });
    props.notify(
      `a new anecdote "${content.attributes.value}" has been created`
    );
    history.push("/");
  };

  const handleClear = () => {
    [content, author, info].forEach((field) => field.clear());
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.attributes} />
        </div>
        <div>
          author
          <input {...author.attributes} />
        </div>
        <div>
          url for more info
          <input {...info.attributes} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleClear}>
          clear
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const clearNotification = {
    timeout: null,
    text: "",
    show: false,
  };

  const [notification, setNotification] = useState(clearNotification);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const notify = (text, duration = 10) => {
    if (notification.timeout) clearTimeout(notification.timeout);
    const timeout = setTimeout(() => {
      setNotification(clearNotification);
    }, duration * 1000);
    setNotification({
      timeout,
      text,
      show: true,
    });
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification.show && <div>{notification.text}</div>}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} notify={notify} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
};

export default App;
