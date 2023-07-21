import express from 'express';
const app = express();
app.use(express.json());
app.post('/hello', (req, res) => {
  console.log(`Hello ${req.body.name}!`);
  res.send('hello');
})
app.listen(8000, () => console.log('server listening to port 8000'));