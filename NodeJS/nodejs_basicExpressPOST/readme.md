This is a basic node.js app based on the Express framework, which shows how to send/receive data through the POST method

The way this works:
- The server opens a http server at localhost:8080

- When the browser issues a GET request, the node app sends the webpage file /index.html
- The webpage has a form, that when the user clicks Submit, it gets sent to the server using the POST protocol (by sending json data to localhost:8080/ )
- The POST data sent from the browser's webpage contains a JSON object containing {user, pass} as text

- The server then responds by sending back a JSON object containing {securitycheck, user, pass}, which gets displayed on the page

Requirements / installation:
- requires you to have run "npm install express", and "npm install cors"
- to run just execute "npm app.js"
- then navigate your browser to "localhost:8080", fill the form and click submit; watch the response appear
- you can also put the index.html contents onto a separate platform like jsfiddle.net and browse it from there, for ease of debugging
