import express from 'express';
let articlesInfo = [
  {
    name: 'learn-react',
    upvote: 0
  },
  {
    name: 'learn-node',
    upvote: 0
  },
  {
    name: 'mongodb',
    upvote: 0
  }
]
const app = express();
app.use(express.json());
app.put('/api/articles/:name/upvote', (req, res) => {
  let { name } = req.params;
  let article = articlesInfo.find(article => (article.name === name));
  if (article) {
    article.upvote += 1;
    res.send(`The ${name} article now got ${article.upvote} upvotes!`)
  }
  else {
    res.send('Article not found!');
  }
})
app.listen(8000, () => console.log('server listening to port 8000'));