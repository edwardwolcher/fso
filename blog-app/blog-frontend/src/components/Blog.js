import React from "react";
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author.username}
  </div>
);

export default Blog;
