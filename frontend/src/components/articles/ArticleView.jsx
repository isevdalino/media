import React, { useEffect, useState } from "react";
import { articleViewContainerStyleSheet, authorStyleSheet, contentStyleSheet, titleStyleSheet, topicLinkStyleSheet } from "./articlesStyles";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router";
import { SEARCH } from "../../constants/Paths";
import { fetchRating, postRating } from "../../server-requests/requests";
import { onLogoutClick } from '../login/logoutHandler';
import { useHistory } from 'react-router';
import { SIGN_IN } from "../../constants/Paths";
import { getReadableDateTime } from "../../constants/common";

function ArticleView({ article, isUserLoggedInState,setIsUserLoggedInState }) {
  const articleViewContainerStyle = articleViewContainerStyleSheet();
  const titleStyle = titleStyleSheet();
  const authorStyle = authorStyleSheet();
  const contentStyle = contentStyleSheet();
  const topicLinkStyle = topicLinkStyleSheet();

  let [rating, setRating] = useState(0);
  let { id } = useParams();
  const history = useHistory();

  const validateNewRating = function (value) {
    return {
      size: 40,
      count: 10,
      isHalf: false,
      edit: isUserLoggedInState ? true : false,
      value: value
    };
  };

  let [ratingView, setRatingView] = useState(validateNewRating(0));

  useEffect(() => {
    fetchRating(id)
      .then(data => setRating(data.rating));
  }, [ratingView]);


  const onChangeRating = function (newValue) {
    postRating(id, newValue)
      .then(data => {
        if(data.status == 403){
          onLogoutClick(history,SIGN_IN, setIsUserLoggedInState) 
      }else{
        setRatingView(validateNewRating(newValue))
      }
      });
  };

  const midRatingStyle = {
    textAlign: "left",
    fontWeight: "bold",
  };

  return (
    <div style={articleViewContainerStyle}>
      <h3 style={titleStyle}>{article.title}</h3>
      <div style={authorStyle}>--- {article.authorName} ---</div>
      <p style={contentStyle}>{article.content}</p>
      <p><a href={SEARCH + '?t=' + article.topic} style={topicLinkStyle}>{article.topic}</a></p>
      <ReactStars {...ratingView} onChange={(value) => onChangeRating(value)} />
      <div style={midRatingStyle}>
        Rating: {rating}/10.0
      </div>
      <div style={{ textAlign: "right" }}>{getReadableDateTime(article.createdAt)}</div>
    </div>
  );
}

export { ArticleView };