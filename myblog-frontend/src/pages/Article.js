import articles from './article-content.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Article = () => {
  const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] });
  useEffect(() => {
    setArticleInfo({ upvote: 3, comments: [] });
  })
  const params = useParams();
  const articleId = params.id;
  const article = articles.find(article => article.name === articleId)
  if (!article) return <h1> 404: Page Not Found!</h1>
  
  return (
    <>
      <h2> {article.title} </h2>
      <p> The article has {articleInfo.upvote} upvote(s)!</p>
      {article.content.map(paragraph => (
        <p>
          {paragraph}
        </p>
      ))}

    </>)
}
export default Article;