# requires Python3 and aioconsole library

# runs a WebSocket server where there's a local variable being broadcast to all clients

import sys
import functools
import asyncio
import aioconsole
import time
import websockets



# this is the variable sent to all connected clients
reply = 0

# coroutine that just increments reply every 1 sec
async def incrementor():
	global reply
	while True:
		reply = reply + 1
		await asyncio.sleep(1)


# coroutine that runs after each client connects
async def wsclient_handler(websocket, path):

	print ("A client connected");

	# if data is received...
	#data = await websocket.recv()
	#reply = f"Data recieved as:  {data}!"

	while True:
		# send the current value of 'reply'
		await websocket.send(str(reply))
		await asyncio.sleep(0.3)


### MAIN 

# run incremental task
asyncio.get_event_loop().create_task(incrementor())

# start server
start_server = websockets.serve(wsclient_handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(start_server)

# wait for keypress

async def waitkey():
    line = await aioconsole.ainput('Press ENTER to quit.')
    print("*** THIS MAY RAISE ERRORS ****")

loop = asyncio.get_event_loop()
loop.run_until_complete(waitkey())
loop.close()
