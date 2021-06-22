import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/login/loginStyles.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { HomePage } from "./components/home/HomePage";
import { Articles, ShowAllArticlesView } from "./components/articles/ShowAllArticlesView";
import { ShowAllPhotoArticlesView } from "./components/photo-articles/ShowAllPhotoArticlesView";
import { CreateArticleView } from "./components/articles/CreateArticleView";
import { CreatePhotoArticleView } from "./components/photo-articles/CreatePhotoArticleView";
import { SIGN_IN, SIGN_UP, HOME, ARTICLES, PHOTO_ARTICLES, CREATE_ARTICLE, CREATE_POLL, POLLS, CREATE_PHOTO_ARTICLE, CREATE_EVENT, SEARCH, TOPICS } from "./constants/Paths";
import { CreatePollView } from "./components/polls/CreatePollView";
import { ShowAllPollsView } from "./components/polls/ShowAllPollsView";
import { PollView } from "./components/polls/PollView";
import { GoogleMap } from './components/events/GoogleMap';
import { ArticleScreenView } from './components/articles/ArticleScreenView';
import { PhotoArticleScreenView } from './components/photo-articles/PhotoArticleScreenView';
import { SignupView } from './components/login/SingupView';
import { LoginView } from './components/login/LoginView';
import { SearchResults } from './components/search/SearchResults';
import SearchBar from './components/search/SearchBar';
import { ShowAllTopicsView } from './components/topics/ShowAllTopicsView';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={HOME}>Distributed media</Link>
            <div className="collapse navbar-collapse navigation-bar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={SIGN_IN}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={SIGN_UP}>Sign up</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <SearchBar />
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path='/' component={LoginView} />
          <Route path={SIGN_IN} component={LoginView} />
          <Route path={SIGN_UP} component={SignupView} />
          <Route path={HOME} component={HomePage} />
          <Route exact path={ARTICLES} component={ShowAllArticlesView} />
          <Route path="/articles/:id" component={ArticleScreenView} />
          <Route path={CREATE_ARTICLE} component={CreateArticleView} />
          <Route exact path={PHOTO_ARTICLES} component={ShowAllPhotoArticlesView} />
          <Route path={CREATE_PHOTO_ARTICLE} component={CreatePhotoArticleView} />
          <Route path="/photo-articles/:id" component={PhotoArticleScreenView} />
          <Route exact path={POLLS} component={ShowAllPollsView} />
          <Route path="/polls/:id" component={PollView} />
          <Route path={CREATE_POLL} component={CreatePollView} />
          <Route path={TOPICS} component={ShowAllTopicsView} />
          <Route path={SEARCH} component={SearchResults} />
          <Route path={CREATE_EVENT} component={GoogleMap} />
        </Switch>
      </div></Router>
  );
}

export default App;