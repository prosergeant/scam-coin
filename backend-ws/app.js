const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors')
const { parseJson } = require('./utils')

// app.use(function (req, res, next) {
// 	console.log('middleware');
// 	req.testing = 'testing';
// 	return next();
// });
// app.get('/', function(req, res, next){
// 	console.log('get route', req.testing);
// 	res.end();
// });

app.use(express.json())
app.use(cors())

app.get('/online-users/', (req, res, next) => {
	res.send(JSON.stringify(users.filter(el => el.id && el.id !== parseInt(req.query.id)).map(el => el.id)))
})

app.get('/users/:id', (req, res, next) => {
	const user = users.find(el => el.id === parseInt(req.params.id))
	res.send(JSON.stringify(user || '{}'))
})

const aWs = expressWs.getWss('/')
const users = []
app.ws('/ws/', (ws, req) => {
	ws.on('close', (reasonCode, description) => {
		const index = users.findIndex(el => JSON.stringify(el.ws) === JSON.stringify(ws))
		if(index !== -1)
			users.splice(index, 1)
	})
	ws.on('message', (msg) => {
		console.log(msg);
		const json = parseJson(msg)
		if(json?.error) {
			console.log('error:', json.error);
			ws.send(JSON.stringify(json))
			ws.close()
			return
		}
		switch (json.event) {
			case 'login':
				const user = users.find(el => el.id === json.payload.id)

				if(user) {
					if(JSON.stringify(user.ws) === JSON.stringify(ws)) {
						ws.send('you already connected')
						break
					}

					ws.send('user already connected');
					ws.close()
					break
				}

				users.push({ id: json.payload.id, ws })
				break
			case 'chat-message':
				for(const client of aWs.clients)
					client.send(`${json.payload.username}: ${json.payload.message}`)
				break
			default:
				ws.send((new Error("wrong pupas")).message)
				break
		}
	});
	// console.log('socket', req.testing);
});

app.listen(8999);
