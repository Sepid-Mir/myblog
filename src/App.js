import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import ArticlesListPage from './pages/ArticlesListPage.js';
import Article from './pages/Article.js';
import NavBar from './NavBar.js';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar/> 
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/articles" element={<ArticlesListPage />}></Route>
          < Route path="/articles/:id" element={<Article />}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
