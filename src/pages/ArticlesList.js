import articles from "./article-content.js";
import { Link } from 'react-router-dom';
const ArticlesList = () => {
  return (<>
    <h1> Articles</h1>
    {articles.map(article => (
      <Link to={`/articles/${article.name}`} className="article-list-item">
        <h3> {article.title}</h3>
        <p> {article.content[0].substring(0, 100)}...</p>
      </Link>
    ))}
  </>
  )
}
export default ArticlesList;