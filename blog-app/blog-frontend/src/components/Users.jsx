import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserListing = ({ user }) => {
  return (
    <div>
      <Link to={`/users/${user.id}`}>{user.name}</Link> - {user.blogs.length}
    </div>
  );
};

const Users = () => {
  const users = useSelector((state) => state.users);

  if (users.length < 1) {
    return <></>;
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <UserListing key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
