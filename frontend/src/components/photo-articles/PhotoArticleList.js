import React from 'react';
import { useHistory } from 'react-router-dom';
import { cardContainerStyleSheet, cardPhotoStyleSheet, cardStyleSheet } from '../articles/articlesStyles';
import "./photoArticleStyles.css";

const PhotoArticleList = ({ photoArticles }) => {
    const containerStyle = cardContainerStyleSheet();
    const cardStyle = cardStyleSheet();
    const cardPhotoStyle = cardPhotoStyleSheet();

    const history = useHistory();
    const handleClick = id => { history.push('/photo-articles/' + id) };

    const isArrayEmpty = photoArticles === undefined || photoArticles.length == 0;

    return (
        <div style={containerStyle}>
            {isArrayEmpty ?
                <h4>There aren't any photos yet.</h4>
                :
                photoArticles.map(photoArticle => (
                    <div key={photoArticle.id} onClick={(e) => handleClick(photoArticle.id, e)} className="responsive">
                        <div className="gallery">
                            <a target="_blank">
                                <img src={photoArticle.content} alt={photoArticle.title} width="600" height="400" />
                            </a>
                            <div className="desc">{photoArticle.title}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PhotoArticleList
