import React from 'react';
import { useHistory } from 'react-router-dom';
import { cardContainerStyleSheet, cardPhotoStyleSheet, cardStyleSheet } from '../articles/articlesStyles';

const PhotoArticleList = ({ photoArticles }) => {
    const containerStyle = cardContainerStyleSheet();
    const cardStyle = cardStyleSheet();
    const cardPhotoStyle = cardPhotoStyleSheet();

    const history = useHistory();
    const handleClick = id => { history.push('/photo-articles/' + id) };

    return (
        <div style={containerStyle}>
            {photoArticles.map(photoArticle => (
                <div style={cardStyle} key={photoArticle.id} onClick={(e) => handleClick(photoArticle.id, e)} >
                    <img style={cardPhotoStyle} src={photoArticle.photoUrl} />
                    <h4>{photoArticle.title}</h4>
                </div>
            ))}
        </div>
    )
}

export default PhotoArticleList
