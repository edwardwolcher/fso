import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const endpoint = `${baseUrl}/${id}`;
  await axios.delete(endpoint, config);
};

const update = async (id, updateObject) => {
  const endpoint = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(endpoint, updateObject, config);
  return response.data;
};

const comment = async (id, comment) => {
  const endpoint = `${baseUrl}/${id}/comments`;
  const response = await axios.post(endpoint, { comment });
  return response.data;
};

const blogService = { setToken, getAll, create, remove, update, comment };

export default blogService;
