import React, { useEffect, useState } from "react";
import { articleViewContainerStyleSheet, authorStyleSheet, contentStyleSheet, titleStyleSheet } from "./articlesStyles";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router";
import { SERVER_ADDRESS } from "../../constants/Paths";

function ArticleView({ article }) {
  const articleViewContainerStyle = articleViewContainerStyleSheet();
  const titleStyle = titleStyleSheet();
  const authorStyle = authorStyleSheet();
  const contentStyle = contentStyleSheet();

  let [rating, setRating] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: 'GET'
    };

    fetch(SERVER_ADDRESS + "ratings/" + id, requestOptions)
      .then(response => response.json())
      .then(data => setRating(data.rating));
  }, [rating]);

  const validateNewRating = function (value) {
    return {
      size: 40,
      count: 10,
      isHalf: false,
      edit: true,
      value: value
    };
  };

  let [ratingView, setRatingView] = useState(validateNewRating(0));

  const onChangeRating = function (newValue) {
    setRatingView(validateNewRating(newValue));
    console.log(`Rating: the new value is ${newValue}`);
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
      <ReactStars {...ratingView} onChange={(value) => onChangeRating(value)} />
      <div style={midRatingStyle}>
        Rating: {rating}/10.0
      </div>
    </div>
  );
}

export { ArticleView };