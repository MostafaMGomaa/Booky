# ERD: Booky

This document explores the design of Booky web store.

We'll use a basic client/server architecture, where a single server is deployed
on a cloud provider next to a document database, and serving HTTP traffic from
a public endpoint.

## Storage

We 'll use a docment database (mongoDB).
We 'll host db at mongo atlas.

### Schema

We 'll need at least the following documents to implement
the Service

**Books**:
| Attribute | Type |
|-----------|------|
| Title | String|
| Slug | String |
| Isbn | String|
| PageCount | Number|
| Price | Number|
| publishedDate | TimeStamp |
| thumbnailUrl | String |
| shortDescription | String |
| longDescription | String |
| status | String |
| authors | Array |
| categories | Array |

**User**:
| Attribute | Type |
|-----------|------|
| Name | String|
| Email | String |
| Photo | String |
| Role | String |
| Password | String|  
| PasswordConfirm| String|  
| PasswordChangedAt | Date |
| PasswordResetToken | String |
| PasswordResetExpires | Date |
| Active | Boolean |

**Chart**:
| Attribute | Type |
|---------- |----- |
| Book | BookObject |
| User | UserObject |
| Price | Number |
| CreatedAt | Date |
| Paid | Boolean |

## Server

A Simple HTTP server us responsible to authentication serving stored data ,
user can filter data via query string.

- Node.js for implementing server .
- Express.js is the web server framework.
- Mongoose ODM

### Auth

A simple JWT-based auth mechanism is to be used with passwords

### API

**Auth**:

```
/signup          [POST]
/login           [POST]
/signout         [GET]
/forgotPassword  [POST]
/resetPassword   [PATCH]
```

**Books**:

```
/books     [GET]
/books     [POST] #create new book for only admin
/books/:id [GET]  #get one book by id
/books/:id [PATCH]
/books/:id [DELETE]
```

**Users**:

```
/user/                     [GET]
/user/:id                  [GET]
/user/me                   [GET]
/user/deleteMe             [DELETE]
/user/updateMyPassword     [PATCH]
```

### Error handling

We will implement:

- AppError class to handling non exsisting routes

* Error controller as global error handler

- Catch Async use to grab catch block in all async functions

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in HTML, CSS, JS.
Uses may be Bootstrap or Chakra UI may both.

## Hosting

The code will be hosted on Github, PRs and issues welcome.
The web client will be hosted using any free web hosting platform such as firebase or netlify or heroku.
