import articles from './article-content.js';
import { useParams } from 'react-router-dom';
const Article = () => {
  const params = useParams();
  const articleId = params.id;
  const article = articles.find(article => article.name === articleId)
  if (!article) return <h1> 404: Page Not Found!</h1>
  return (
    <>
      <h2> {article.title} </h2>
      {article.content.map(paragraph => (
        <p>
          {paragraph}
        </p>
      ))}

    </>)
}
export default Article;