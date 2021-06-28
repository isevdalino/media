import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/login/loginStyles.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage } from "./components/home/HomePage";
import { ShowAllArticlesView } from "./components/articles/ShowAllArticlesView";
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
import { ShowAllTopicsView } from './components/topics/ShowAllTopicsView';
import { ToolbarComponent } from './components/toolbar/ToolbarComponent';
import { isUserLoggedIn } from './components/login/logoutHandler';

function App() {
  let [isUserLoggedInState, setIsUserLoggedInState] = useState(isUserLoggedIn());

  return (
    <Router>
      <div className="App">
        <ToolbarComponent isUserLoggedInState={isUserLoggedInState} setIsUserLoggedInState={setIsUserLoggedInState} />
        <Switch>
          <Route exact path='/' >
            <LoginView setIsUserLoggedInState={setIsUserLoggedInState} />
          </Route>
          <Route path={SIGN_IN}>
            <LoginView setIsUserLoggedInState={setIsUserLoggedInState} />
          </Route>
          <Route path={SIGN_UP} component={SignupView} />
          <Route path={HOME} component={HomePage} />
          <Route exact path={ARTICLES} >
            <ShowAllArticlesView isUserLoggedInState={isUserLoggedInState} />
          </Route>
          <Route path="/articles/:id" >
            <ArticleScreenView isUserLoggedInState={isUserLoggedInState} setIsUserLoggedInState={setIsUserLoggedInState}/>
          </Route>
          <Route path={CREATE_ARTICLE} >
            <CreateArticleView setIsUserLoggedInState={setIsUserLoggedInState} />
          </Route>
          <Route exact path={PHOTO_ARTICLES}>
            <ShowAllPhotoArticlesView isUserLoggedInState={isUserLoggedInState} />
          </Route>
          <Route path={CREATE_PHOTO_ARTICLE} component={CreatePhotoArticleView} />
          <Route path="/photo-articles/:id" component={PhotoArticleScreenView} />
          <Route exact path={POLLS}>
            <ShowAllPollsView isUserLoggedInState={isUserLoggedInState} />
          </Route>
          <Route path="/polls/:id" >
            <PollView setIsUserLoggedInState={setIsUserLoggedInState} />
          </Route>
          <Route path={CREATE_POLL} component={CreatePollView}>
            <CreatePollView setIsUserLoggedInState={setIsUserLoggedInState}/>
          </Route>
          <Route path={TOPICS} component={ShowAllTopicsView} />
          <Route path={SEARCH} component={SearchResults} />
          <Route path={CREATE_EVENT} component={GoogleMap} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;