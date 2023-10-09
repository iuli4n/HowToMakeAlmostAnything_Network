// Importing express module
// This will require you to npm install the modules called openai@3.3.0, express, cors



require("dotenv").config();


const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



initialize_webserver();


function initialize_webserver() {
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



async function handlePosts(req, res) {
	console.log(`Received body: ${JSON.stringify(req.body)}`);

  const { prompt } = req.body;
  console.log(`Sending prompt: ${prompt}`);


  // do openai stuff
  
  /**
  // use this for older models without chat history
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7
  });***/
  
  const completion = await openai.createChatCompletion({
		model:'gpt-3.5-turbo',
		messages: [{role: "user", content: prompt}], //conversationHistory,
		temperature:0,
		top_p:1,
		frequency_penalty:0,
		presence_penalty:0,
		max_tokens:360
		});
  
   var response = completion.data.choices[0].message.content;
  //use this for older models: var response = completion.data.choices[0].text;
  console.log(`Response: ${response}`);

  // send response back
  
  res.send({
		status: "done",
		response: response
  });
  
  console.log(`Sent response back`);
  
  
}