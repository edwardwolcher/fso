import listHelper from "../utils/list_helper.js";

const emptyList = [];

const oneBlogList = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "oneblog",
    author: "edward",
    url: "/blog/oneblog",
    likes: 5,
    __v: 0,
  },
];

const threeBlogList = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "oneblog",
    author: "edward",
    url: "/blog/oneblog",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "twoblog",
    author: "edward",
    url: "/blog/twoblog",
    likes: 6,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f0",
    title: "cliveblog",
    author: "clive",
    url: "/blog/cliveblog",
    likes: 7,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });
  test("of single-item list is accurate", () => {
    const result = listHelper.totalLikes(oneBlogList);
    expect(result).toBe(5);
  });
  test("of many-item list is accurate", () => {
    const result = listHelper.totalLikes(threeBlogList);
    expect(result).toBe(18);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog(emptyList);
    expect(result).toBe(null);
  });
  test("of single-item list is accurate", () => {
    const result = listHelper.favoriteBlog(oneBlogList);
    expect(result).toEqual(oneBlogList[0]);
  });
  test("of many-item list is accurate", () => {
    const result = listHelper.favoriteBlog(threeBlogList);
    expect(result).toEqual(threeBlogList[2]);
  });
});

describe("most Blogs", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostBlogs(emptyList);
    expect(result).toBe(null);
  });
  test("of single-item list is accurate", () => {
    const result = listHelper.mostBlogs(oneBlogList);
    const expectedAuthor = {
      author: "edward",
      posts: 1,
    };
    expect(result).toEqual(expectedAuthor);
  });
  test("of many-item list is accurate", () => {
    const result = listHelper.mostBlogs(threeBlogList);
    const expectedAuthor = {
      author: "edward",
      posts: 2,
    };
    expect(result).toEqual(expectedAuthor);
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostLikes(emptyList);
    expect(result).toBe(null);
  });
  test("of single-item list is accurate", () => {
    const result = listHelper.mostLikes(oneBlogList);
    const expectedAuthor = {
      author: "edward",
      likes: 5,
    };
    expect(result).toEqual(expectedAuthor);
  });
  test("of many-item list is accurate", () => {
    const result = listHelper.mostLikes(threeBlogList);
    const expectedAuthor = {
      author: "edward",
      likes: 11,
    };
    expect(result).toEqual(expectedAuthor);
  });
});
