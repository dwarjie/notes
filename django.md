# Django

Django is a Web Framework for python that helps developers build and ship web applications in a matter of hours (speed is keeeeeeeey).

Key Features:
- *Database ORM*: For creating your database layout using python.
- *Free API*: Once your database is created and used, you can use different API's for read, create, update, and delete functionalities.
- *Admin Site*: A web application for altering your database data. Kinda like XAMPP for PHP with full authentication.
- *URL Matching*: Kindla like routes in Nodejs. You will be able to create a pattern of different urls (with parameters if needed) and specify the specific views to run if the URL was matched from the request of the client.
- *Views*: Once a route/url is matched, it will call the callback function provided. This callback functions are called "Views" which accepts data from the request, returns a HTTPReponse or raise a HTTP404. Usually, in this part the program will return a view using a template. Kindly like EJS in Nodejs.
- *Templating Engine*: Django has it's own templating engine that is integrated well with the model layer.
- Applications: Are reusable codes that can interact with parts of the framework.
