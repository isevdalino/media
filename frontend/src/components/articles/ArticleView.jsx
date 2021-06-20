import React, { useState } from "react";
import { articleViewContainerStyleSheet, authorStyleSheet, contentStyleSheet, titleStyleSheet } from "./articlesStyles";
import ReactStars from "react-rating-stars-component";

function ArticleView({ article }) {
  const articleViewContainerStyle = articleViewContainerStyleSheet();
  const titleStyle = titleStyleSheet();
  const authorStyle = authorStyleSheet();
  const contentStyle = contentStyleSheet();

  let [canEdit, setCanEdit] = useState(true);

  const validateNewRating = function (value, edit) {
    return {
      size: 40,
      count: 10,
      isHalf: false,
      edit: edit,
      value: value
    };
  };

  let initialRating = validateNewRating(article.rating, canEdit);
  let [rating, setRating] = useState(initialRating);

  const onChangeRating = function (newValue, canEdit) {
    setCanEdit(false);
    setRating(validateNewRating(newValue, canEdit));
    console.log(`Rating: the new value is ${newValue}`);
  };

  const midRatingStyle = {
    textAlign: "left",
    fontWeight: "bold",
  };

  return (
    <div style={articleViewContainerStyle}>
      <h3 style={titleStyle}>{article.title}</h3>
      <div style={authorStyle}>--- {article.author} ---</div>
      <p style={contentStyle}>{article.content}</p>
      <ReactStars {...rating} onChange={(value) => onChangeRating(value, canEdit)} />
      <div style={midRatingStyle}>
        Rating: {article.rating}/10.0
      </div>
    </div>
  );
}

export { ArticleView };