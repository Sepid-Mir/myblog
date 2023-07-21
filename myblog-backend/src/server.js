import express from 'express';
let articlesInfo = [
  {
    name: 'learn-react',
    upvote: 0,
    comments: []
  },
  {
    name: 'learn-node',
    upvote: 0,
    comments: []
  },
  {
    name: 'mongodb',
    upvote: 0,
    comments: []
  }
]
const app = express();
app.use(express.json());
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