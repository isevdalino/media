import React, { useEffect, useState } from "react";
import { articleViewContainerStyleSheet, authorStyleSheet, contentStyleSheet, titleStyleSheet, topicLinkStyleSheet } from "./articlesStyles";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router";
import { SEARCH } from "../../constants/Paths";
import { fetchRating, postRating } from "../../server-requests/requests";

function ArticleView({ article, isUserLoggedInState }) {
  const articleViewContainerStyle = articleViewContainerStyleSheet();
  const titleStyle = titleStyleSheet();
  const authorStyle = authorStyleSheet();
  const contentStyle = contentStyleSheet();
  const topicLinkStyle = topicLinkStyleSheet();

  let [rating, setRating] = useState(0);
  let { id } = useParams();

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
        setRatingView(validateNewRating(newValue))
        console.log(`Rating: the new value is ${newValue}`);
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
    </div>
  );
}

export { ArticleView };