import express from 'express';
import { db, connectToDb } from './db.js';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name);
  // const client = new MongoClient('mongodb://127.0.0.1:27017');
  // await client.connect();
  // const db = client.db('react-blog-db'); //use react-blog-db
  const article = await db.collection('articles').findOne({ name: name });
  if (article) {
    res.json(article);
  }
  else {
    res.sendStatus(404).send('article not found!');
  }

})

app.put('/api/articles/:name/upvote', async (req, res) => {
  let { name } = req.params;
  // let article = articlesInfo.find(article => (article.name === name));
  // const client = new MongoClient('mongodb://127.0.0.1');
  // await client.connect();
  // const db = client.db('react-blog-db');
  await db.collection('articles').updateOne({ name }, { $inc: { upvote: 1 } });
  const article = await db.collection('articles').findOne({ name });
  if (article) {
    // article.upvote += 1;
    res.send(`The ${name} article now got ${article.upvote} upvotes!!!`)
  }
  else {
    res.send('Article not found!');
  }
})
app.post('/api/articles/:name/comments', async (req, res) => {

  let { name } = req.params;
  let { postedBy, text } = req.body;
  // let article = articlesInfo.find(a => (a.name === name));
  // const client = new MongoClient('mongodb://127.0.0.1:27017');
  // await client.connect();
  // const db = client.db('react-blog-db');
  const article = await db.collection('articles').findOne({ name });
  if (article) {
    // let { postBy, text } = req.body;
    // article.comments.push({ postBy, text });
    await db.collection('articles').updateOne({ name }, { $push: { comments: { postedBy, text } }, });
    res.send(article.comments);
  }
  else {
    res.send("The article doesn\'t exist!");
  }
})
connectToDb(() => {
  console.log('Successfully connected to DB!')
  app.listen(8000, () => console.log('server listening to port 8000'));
});
