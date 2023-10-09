// Importing express module
// This will require you to npm install the modules called express and cors

initialize();


function initialize() {
	const express = require('express');
	var cors = require('cors')
	var app = express()
	app.use(cors())
	app.use(express.json());

	// GET handler for "/" - sends the index.html file
	app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
	});

	// POST handler 
	app.post('/', handlePosts);
	 
	// Start the server on port 8080
	app.listen(8080, () => {
	  console.log('Our express server is up');
	});
}

function handlePosts(req, res) {
	console.log(`Received body: ${JSON.stringify(req.body)}`);

  const { user, pass } = req.body;
  console.log(`Extracted user: ${user}`);
  
  // send back the same user/pass, and a 'securitycheck' field
  res.send({
		securitycheck: "passed",
		user,
		pass
  });
  
  console.log(`Sent response back`);
  
}