import { getReadableDateTime } from "../../constants/common";
import { SEARCH } from "../../constants/Paths";
import { articleViewContainerStyleSheet, photoStyleSheet, titleStyleSheet } from "../articles/articlesStyles";
import ReactStars from "react-rating-stars-component";
import { fetchRating, postRating } from "../../server-requests/requests";
import { onLogoutClick } from '../login/logoutHandler';
import { SIGN_IN } from "../../constants/Paths";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router';

function PhotoArticleView({ photoArticle,isUserLoggedInState,setIsUserLoggedInState }) {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const photoStyle = photoStyleSheet();
    const titleStyle = titleStyleSheet();
    const topicLinkStyle = {
      textAlign: "right",
    };

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
            <img style={photoStyle} src={photoArticle.content} />
            <h3 style={titleStyle}>{photoArticle.title}</h3>
            <div> <a href={SEARCH + '?a=' + photoArticle.authorName} style={{ color: "Grey", textAlign: "right" }}>{photoArticle.authorName}</a></div>
            <p style={topicLinkStyle}><a href={SEARCH + '?t=' + photoArticle.topic}>{photoArticle.topic}</a></p>
            <div style={{ textAlign: "right" }}>{getReadableDateTime(photoArticle.createdAt)}</div>
            <ReactStars {...ratingView} onChange={(value) => onChangeRating(value)} />
            <div style={midRatingStyle}>
                Rating: {rating}/10.0
            </div>
        </div>
    );
}

export { PhotoArticleView };
