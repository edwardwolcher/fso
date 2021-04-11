import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);

  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) return <></>;

  return (
    <div>
      <h1>{user.name}</h1>
      {user.blogs.map((b) => (
        <div key={b.id}>
          <Link to={`/blogs/${b.id}`}>{b.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default User;
