const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => (total += blog.likes), 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce(
    (max, blog) => {
      return blog.likes > max.likes ? blog : max;
    },
    {
      likes: -1,
    }
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = blogs.map((blog) => {
    return { author: blog.author, posts: 0 };
  });
  blogs.forEach((blog) => {
    const author = authors.find((author) => author.author === blog.author);
    author.posts += 1;
  });
  return authors.reduce(
    (max, author) => {
      return author.posts > max.posts ? author : max;
    },
    { posts: -1 }
  );
};
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = blogs.map((blog) => {
    return { author: blog.author, likes: 0 };
  });
  blogs.forEach((blog) => {
    const author = authors.find((author) => author.author === blog.author);
    author.likes += blog.likes;
  });
  return authors.reduce(
    (max, author) => {
      return author.likes > max.likes ? author : max;
    },
    { likes: -1 }
  );
};

const listHelper = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

export default listHelper;
