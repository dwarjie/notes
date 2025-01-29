# Fundamentals of Web Apps

## HTTP GET
You access this [link](https://studies.cs.helsinki.fi/exampleapp/) for a sample web-app that demonstrate some network informations we need.

Once you opened the link/web-app, there are a lot of things that's happening that you can see through the Network tab (make sure to open the Network Tab in your Developer Console).

### Headers
In the Headers Tab of browser requests, you will see the General Information of the request, Response Information, and Request Headers.

#### General
The following informations are available through this tab:

- Request Url: The url where the browser sends the request (e.g., server url, api endpoint url).
- Request Method: The HTTP method used by the browser request (e.g., GET, POST, PUT, DELETE).
- Status Code: The status of the server response. If set to 200, it means the request is successfull.

#### Response Header
The following informations are available through this tab:

- Content Length: The size of the response in bytes.
- Content Type: The type/format of the response (text/html, img/png, text/json). The browser will base on this information on how the data will be rendered in the browser.
- Date: The date and time when the request is sent.
- Location: The location in which the user is redirected to (```res.redirect(/notes)```). 

### Response
This tab show the reponse data depending on the Content-Type of the response. If the data content-type is set to "text/html", the response will be rendered in HTML tags.

> Note: If the response has an img tag, the browser will create another GET request to the server to download the specified image. It may hard to notice but, the browser will start rendering the page before the image has been fetched from the server.

## Event Handlers and Callback Functions
```js
var xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
  // code that takes care of the server response
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
```

If you're not familiar with Callback Functions, you may find this code a bit odd. The request to the server is on the last line but the code that handles the request is at the top. What's going on?

```js
xhttp.onreadystatechange = function () {
```

On this line, an onreadystatechange event handler is being assigned when the object state changed. The function defined will run once the event is triggered. This is called Callback functions.

> Note: The application code does not invoke the function (directly call the function) itself, but the runtime environment - the browser, invokes the function at an appropriate time when the event is triggered.
## Forms and HTTP POST
```html
<form action="/new_note" method="POST">
  <input type="text" name="note">
  <br/>
  <input type="submit" value="Save">
</form>
```

The following code pertains into a HTML with Form, Text Input, and a Button. The following attributes are found in the <form> tag:

- action: Address of the server in which the browser will make the request.
- method: The HTTP method to be performed when the request is made.

```js
app.post('/new_note', (req, res) => {
  notes.push({
    content: req.body.note,
    date: new Date(),
  })

  return res.redirect('/notes')
})
```

The following example is a code to handle the POST method in the address "new_note". This will create a new object that will be pushed in the notes object, once done the user will be redirected into the "/notes" address.

## Single Page Application (SPA)
This method of creating a Web Page resolves the slow transitions of web app. Instead of loading an entire page when the user moves into a different url of the page, the data are dynamically changing based on the user (manipulated by JavaScript).

With this method, a page refresh never occurs; instead all necessary HTML, JavaScript, and CSS code is either retrieved by the browser with a single page load, or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions.
