import express from 'express';

const app = express();
// какая разница     "dev": "nodemon server.ts",
//     "start": "node index.js"

// что делает строка снизу?
// app.use(express.json());
const PORT = 5000;
// app.get('/', (req, res, next) => {
// 	res.send('response for get request')
// 	// res.status(200).json({
// 	//   'message': 'Running Node with Express and Typescript'
// 	// });
// });
// надо ли статусы отправлять всегда через res.status(xxx).json или можно res.send ?
app.route('/')
	.get((req, res) => {
		res.send('Get a random book')
	})
	.post((req, res) => {
		res.send('Add a book')
	})
	.put((req, res) => {
		res.send('Update the book')
	})
	.patch((req, res) => {
		res.send('Slightly update the book')
	})
	.delete((req, res) => {
		res.send('Delete a book')
	})


app.listen(PORT, () => {
	console.log(
		`Server running on ${PORT}.`
	)
});