import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/login/loginStyles.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/login.component";
import SignUp from "./components/login/signup.component";
import { HomePage } from "./components/home/HomePage";
import { Articles } from "./components/articles/Articles";
import { PhotoArticles } from "./components/photo-articles/PhotoArticles";
import { CreateArticleView } from "./components/articles/CreateArticleView";
import { CreatePhotoArticleView } from "./components/photo-articles/CreatePhotoArticleView";
import { SIGN_IN, SIGN_UP, HOME, ARTICLES, PHOTO_ARTICLES, CREATE_ARTICLE, CREATE_POLL, POLLS, CREATE_PHOTO_ARTICLE, CREATE_EVENT, SEARCH } from "./constants/Paths";
import { CreatePollView } from "./components/polls/CreatePollView";
import { Polls } from "./components/polls/Polls";
import { PollView } from "./components/polls/PollView";
import { GoogleMap } from './components/events/GoogleMap';
import { ArticleScreenView } from './components/articles/ArticleScreenView';
import { PhotoArticleScreenView } from './components/photo-articles/PhotoArticleScreenView';
import { SignupView } from './components/login/SingupView';
import { SearchResults } from './components/search/SearchResults';
import SearchBar from './components/search/SearchBar';

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
          <Route exact path='/' component={Login} />
          <Route path={SIGN_IN} component={Login} />
          <Route path={SIGN_UP} component={SignupView} />
          <Route path={HOME} component={HomePage} />
          <Route exact path={ARTICLES} component={Articles} />
          <Route path="/articles/:id" component={ArticleScreenView} />
          <Route path={CREATE_ARTICLE} component={CreateArticleView} />
          <Route exact path={PHOTO_ARTICLES} component={PhotoArticles} />
          <Route path={CREATE_PHOTO_ARTICLE} component={CreatePhotoArticleView} />
          <Route path="/photo-articles/:id" component={PhotoArticleScreenView} />
          <Route exact path={POLLS} component={Polls} />
          <Route path="/polls/:id" component={PollView} />
          <Route path={CREATE_POLL} component={CreatePollView} />
          <Route path={SEARCH} component={SearchResults} />
          <Route path={CREATE_EVENT} component={GoogleMap} />
        </Switch>
      </div></Router>
  );
}

export default App;