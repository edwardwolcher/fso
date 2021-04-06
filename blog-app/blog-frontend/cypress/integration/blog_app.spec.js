describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "clive",
      name: "Clive Cat",
      password: "12345",
      role: "author",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blog");
  });

  it("user can log in", function () {
    cy.contains("Sign in").click();
    cy.get("#input-loginUsername").type("clive");
    cy.get("#input-loginPassword").type("12345");
    cy.get("#input-loginButton").click();
  });

  it("login fails with bad password", function () {
    if (cy.contains("logout")) {
      cy.contains("logout").click();
    }
    cy.contains("Sign in").click();
    cy.get("#input-loginUsername").type("clive");
    cy.get("#input-loginPassword").type("wrong");
    cy.get("#input-loginButton").click();
    cy.get(".message").contains("invalid password");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Sign in").click();
      cy.get("#input-loginUsername").type("clive");
      cy.get("#input-loginPassword").type("12345");
      cy.get("#input-loginButton").click();
    });

    it("a new blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#input-newBlogTitle").type("New Blog");
      cy.get("#input-newBlogUrl").type("/newblog");
      cy.get("#input-newBlogSubmit").click();
    });
    it("blogs can be liked", function () {
      cy.contains("New Blog").click();
      cy.get("#input-newBlogTitle").type("New Blog");
      cy.get("#input-newBlogUrl").type("/newblog");
      cy.get("#input-newBlogSubmit").click();
    });
  });
});
