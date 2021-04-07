import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (object) => {
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (object) => {
  const endpoint = baseUrl + "/" + object.id;
  const response = await axios.put(endpoint, object);
  return response.data;
};

export default { getAll, createNew, update };
