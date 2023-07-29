import articles from './article-content.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleComments from '../components/ArticleComments.js';
const Article = () => {
  const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] });
  const { id } = useParams();
  const article = articles.find(a => a.name === id);
  useEffect(() => {
    const getInfo = async () => {
      const response = await axios.get(`/api/articles/${id}`);
      const newArticleInfo = await response.data;
      setArticleInfo(newArticleInfo);
    }
    getInfo();
  }, [])

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
      <ArticleComments comments={articleInfo.comments}/>

    </>)
}
export default Article;