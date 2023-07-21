import articles from "./article-content.js";
import { Link } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList.js';
const ArticlesListPage = () => {
  return <ArticlesList articles={articles}/>
}
export default ArticlesListPage;