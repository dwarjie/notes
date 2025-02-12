# Node.js and Express

Node.js is a JavaScript runtime based on Chrome's V8 runtime (which is used for Google Chrome Browser).

Express is a server-side library module abstracting the usage of node:http for better and easier development.

# NPM

Node Package Manager (npm) is the package manager of both front-end and back-end development.

## Understandting npm's dependency model

We all know that npm helps developer manage all their project dependencies they need and the dependencies of the libraries. Npm handles version management of dependencies are not strict to a specific version but instead a range of versions. Having a range of versions, npm uses semver (Semantic Versioning) to express version ranges that works with the library/dependency (e.g., 1.2.3).

Let's say express was installed in your project. Looking at the package.json, you will see the dependencies with ```"express": "^4.18.2"```. What does the caret means?

This means that if when the dependencies of a project are updated, the version of express would be atleast "4.18.2". However, the installed version may also have a larger patch number (the last number), or a large minor number (middle number). The major version of the library indicates the first major number must be the same.

With all this, the tricky part is to know when this is safe and when it's not.

## Dependency duplication and dependency tree

Take a look at this example:

```
foo
├── hello ^0.1.2
└── world ^1.0.7

bar
├── hello ^0.2.8
└── goodbye ^3.4.0
```

We can disregard the world and goodbye dependency and focus on the hello dependency which is used in both "foor" and "bar" with conflicting versions. Most package managers would simply barf here, reporting a version conflict because only one version of any particular package can be installed at a time.

In npm, it's totally okay with installing different versions of the same package because each package gets its own set of dependencies.

```
node_modules/
├── foo/
│   └── node_modules/
│       ├── hello/
│       └── world/
└── bar/
    └── node_modules/
        ├── hello/
        └── goodbye/
```

It may seem great that npm can handle this however, it is not without drawbacks. The most apparent downside is a significant increase in code size, given the potential for many, many copies of the same package, all with different versions. The more insidious problem (and the one that I see crop up quite a lot in the npm ecosystem without much thought) is how dependency isolation can affect cross-package communication.

## Dependency isolation and values that pass package boundaries

While npm's dependency duplication works well for simple cases, it can lead to issues when packages expose internal dependencies as part of their interface. This can cause runtime errors when packages with different versions of the same dependency are used together.

```
awesome-button
└── react ^0.3.0

amazing-modal
└── react ^15.3.1
```

Given that these two packages use wildly different versions of React, npm would give each of them their own copy of React, as requested, and packages would happily install. However, if you tried to use these components together, they wouldn’t work at all! A newer version of React simply cannot understand an old version’s component, so you would get a (likely confusing) runtime error.

Npm has a solution to this particular problem that allows package authors to explicitly express these "cross-interface" dependencies.

## Peer Dependencies

In npm, dependencies can be categorized as either "dependencies" or "peer dependencies". The main difference between the two is how npm resolves them. Peer dependencies are expected to be provided by the dependent package, whereas dependencies are installed by npm.

To determine if a dependency should be a peer dependency, consider the following rule:

If a dependency is visible in the package's interface, it should be a peer dependency.
In other words, if a function in a package's public interface depends on a dependency, it should be listed as a peer dependency. This is because the dependent package is expected to provide the dependency.

# REST (REpresentational State Transfer)

REST is an architectural style for distributed hypermedia steams or an approach on creating a Web Based API's (Application Programming Interface)

A Web API that has an architecture style of REST is called REST API or RESTful API

The following are Six Guiding Principle of REST that promotes simplicity, scalability, and statelessness:
- Client-Server
- Stateless
- Uniform Interface
- Cacheable
- Layered System
- Code on Demand (optional)

## Client-Server

A RESTful system should operate on a client-server model. Meaning, there should be a connection or one-to-one communication between a client (which sends a requests to a server) and the server (which listens to a client and responds a data/resource).

## Stateless

This does not mean that the server and client does not have any state. This means that the server don't need to know the state of the client and vice versa. The server do not keep or store all past requests of the client, the server has no idea of it's existence. Each request from the client are treated standalone.

## Uniform Interface

Uniform Interface constraints/rules ensures that there is a common language between the server and the client for easy communications and allows each part to be modified without breaking the entire system.

1. Identification Resources:
This first rule affects on how the resources are identified (e.g., HTML Document, User Account, etc.). Each resource should contain a unique "stable" URI or identifier that can be used by the client to request a specific resource.

Stable Identifier means that it does not change accross interactions, and it does not change even if the resource state changes.

Example:
- Making a GET Request to the endpoint "api/note/10". Which returns the note with an id (identifier) of 10

2. Manipulation of resources through representation
In RESTful system, the server has full control of the resources and responsible for performing any manipulation to the resource (e.g., add, update, delete). The client sends a representation (usually a JSON Object) on how it should look like, the server can take this as a suggestion but still has the full control on what to do with the resource.

Example:
- When a user makes an HTTP POST or PUT operation to the server for creating a new blog post. The client will send the content and images to the server, then the server will create the plog post.

3. Self-descriptive messages
A self-descriptive messages is the one that contains everything for the client to understand it. There should not be additional documents or separate document that needs to be requested separately.

Example:
- When a user types the "http://www.example.com" in the address bar, the client sends the following HTTP request:

```
GET / HTTP/1.1
Host: www.example.com
```
This message is self descriptive since it indicates that the HTTP method of the request from the client is GET, the HTTP Protocol used (1.1)

The server may respond like this:

```
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <head>
    <title>Home Page</title>
  </head>
  </body>
    <div>Hello World!</div>
    <a href= “http://www.recurse.com”> Check out the Recurse Center! </a>
    <img src="awesome-pic.jpg">
  </body>
</html> 
```

This message is self descriptive since it indicates on how the client may interpret the message body (indicating by Content-Type: text/html).

## Hypermedia
Hypermedia is a data sent from the server to the client which contains on what it can do next-in other words, what further requests can be made.

Example:
```
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <head>
    <title>Home Page</title>
  </head>
  </body>
    <div>Hello World!</div>
    <a href= “http://www.recurse.com”> Check out the Recurse Center! </a>
    <img src="awesome-pic.jpg">
  </body>
</html> 
```
With the response above sent by the server, the message body indicates what requests can be done next or further requests needs.

- ```<a href= “http://www.recurse.com”> Check out the Recurse Center! </a>``` indicates to send a GET request if the client clicks on the link
- ```<img src="awesome-pic.jpg">``` indicates to send a GET request immediately to display the image in the browser.

When a system has identifiers for each resource, manipulates them through sending representations from the client to the server, and has messages that are self-descriptive and composed of hypermedia, it is said to have a uniform interface. This is perhaps the most important attribute of a RESTful system, as it allows for clients to intelligently adapt to changes.

## Caching

Caching is a process of saving the mostly requested data on the client's machine to save time instead of requesting again to the server and making a round trip between the client and server. In REST, server responses should be labelled if cachable or non-cachable

## Layered System

This constraint indicates that there can be more than just client and server components. This means there can be more than one layer of in the system. However, each component can only see and interact with the very next layer.

## Code in demand (optional)

Code in demand is the only optional constraint and refers to an ability for the server to send an executable code in the client.

Example:
- A ```<script>``` tag in the html document that automatically fetches a JavaScript file from the server and executes it once the browser is loaded.

# HTTP

## Safe Methods

Safe Methods are considered requests that do not alter any website data or settings. Their only purpose is to retrieve data or resources without modifying anything.

Example:
When requesting the informations regarding the user profile.

The following methods are considered as Safe:
- GET: Used to request an information, data, or resource
- HEAD: Used to request for a website metadata
- OPTIONS: Used to retrieve informations on what actions can be performed in the website
- TRACE: Used for debugging purposes.

## Idempotent Methods:

Idempotent Methods are request that has the same output regardless how many times it's been requested.

Example:
When a user tried to send the same message to the same person, the message will be sent exactly the same to the same person multiple times. Thus, the same result every request.

The following methods are considered as Idempotent Methods:
- PUT: Used for updating or replacing the whole resource. When used to update the same property with the same information multiple times, the result will still be the same.
- DELETE: Used to delete a resource. If requested to delete the same resource multiple times, the result will still be the same.
- Safe Methods (e.g., GET, HEAD): Safe Methods are used to request for a resource, if the same resource is requested multiple times, the same data will be returned.

## Non-Idempotent Methods:

The oposite of Idempotent Methods, if same request is sent multiple times the output will be different.

Example:
Creating the user named "Mark" will create multiple resources named "Mark"

The following methods are considered as Non-Idempotent:
- POST: Used to create a new resource. If same request is sent multiple times, multiple resources will be created.
