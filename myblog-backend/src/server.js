import express from 'express';
import { MongoClient } from 'mongodb';
// let articlesInfo = [
//   {
//     name: 'learn-react',
//     upvote: 0,
//     comments: []
//   },
//   {
//     name: 'learn-node',
//     upvote: 0,
//     comments: []
//   },
//   {
//     name: 'mongodb',
//     upvote: 0,
//     comments: []
//   }
// ]
const app = express();
app.use(express.json());
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name);
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('react-blog-db'); //use react-blog-db
  const article = await db.collection('articles').findOne({ name: name });
  if (article) {
    res.json(article);
  }
  else {
    res.sendStatus(404).send('article not found!');
  }

})

app.put('/api/articles/:name/upvote', (req, res) => {
  let { name } = req.params;
  let article = articlesInfo.find(article => (article.name === name));
  if (article) {
    article.upvote += 1;
    res.send(`The ${name} article now got ${article.upvote} upvotes!!!`)
  }
  else {
    res.send('Article not found!');
  }
})
app.post('/api/articles/:name/comments', (req, res) => {

  let { name } = req.params;
  let article = articlesInfo.find(a => (a.name === name));
  if (article) {
    let { postBy, text } = req.body;
    article.comments.push({ postBy, text });
    res.send(article.comments);
  }
  else {
    res.send("The article does not exist!");
  }
})
app.listen(8000, () => console.log('server listening to port 8000'));