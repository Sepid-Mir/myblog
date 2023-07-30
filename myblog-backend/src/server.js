import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
app.use(express.json());
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name);
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
  await db.collection('articles').updateOne({ name }, { $inc: { upvote: 1 } });
  const article = await db.collection('articles').findOne({ name });
  if (article) {
    res.json(article)
  }
  else {
    res.send('Article not found!');
  }
})
app.post('/api/articles/:name/comments', async (req, res) => {

  let { name } = req.params;
  let { postedBy, text } = req.body;
  const article = await db.collection('articles').findOne({ name });
  if (article) {
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
