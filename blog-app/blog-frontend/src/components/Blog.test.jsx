import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test Blogpost",
    author: {
      id: "test-id",
      name: "Test Name",
      username: "testname",
    },
    url: "/test",
    likes: 69,
  };
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).toHaveTextContent(blog.likes);
  expect(component.container).not.toHaveTextContent(blog.author.name);
  expect(component.container).not.toHaveTextContent(blog.url);
});

test("renders details on click", () => {
  const blog = {
    title: "Test Blogpost",
    author: {
      id: "test-id",
      name: "Test Name",
      username: "testname",
    },
    url: "/test",
    likes: 69,
  };
  const component = render(<Blog blog={blog} />);
  const detailsButton = component.getByText("details");
  fireEvent.click(detailsButton);
  expect(component.container).toHaveTextContent(blog.author.name);
  expect(component.container).toHaveTextContent(blog.url);
});

test("can like", () => {
  const blog = {
    title: "Test Blogpost",
    author: {
      id: "test-id",
      name: "Test Name",
      username: "testname",
    },
    url: "/test",
    likes: 69,
  };
  const user = {
    username: "testname",
    name: "Test Name",
    id: "test-id",
  };
  const component = render(<Blog blog={blog} user={user} />);
  const likeButton = component.container.querySelector(".likeButton");
  expect(likeButton).toBeDefined();
});

test("can delete", () => {
  const blog = {
    title: "Test Blogpost",
    author: {
      id: "test-id",
      name: "Test Name",
      username: "testname",
    },
    url: "/test",
    likes: 69,
  };
  const user = {
    username: "testname",
    name: "Test Name",
    id: "test-id",
    role: "author",
  };
  const component = render(<Blog blog={blog} user={user} />);
  const detailsButton = component.getByText("details");
  fireEvent.click(detailsButton);
  const deleteButton = component.getByText("delete");
  expect(deleteButton).toBeDefined();
});
