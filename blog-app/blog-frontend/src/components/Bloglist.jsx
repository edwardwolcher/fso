import React from "react";
import Blog from "./Blog";
const Bloglist = ({ blogs, setBlogs, sendMessage, user }) => {
  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          sendMessage={sendMessage}
          user={user}
        />
      ))}
    </div>
  );
};

export default Bloglist;
