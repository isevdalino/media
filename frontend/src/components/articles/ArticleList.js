import React from 'react';
import { useHistory } from 'react-router-dom';
import { cardContainerStyleSheet, cardStyleSheet } from './articlesStyles';

const ArticleList = ({ articles }) => {
    const containerStyle = cardContainerStyleSheet();
    const cardStyle = cardStyleSheet();
    const cutText = {
        width: "190px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "10px",
        fontSize: "1.3rem",
        background: "white",
        resize: "horizontal"
    };

    const history = useHistory();
    const handleClick = id => { history.push('/articles/' + id) };

    return (
        <div style={containerStyle}>
            {articles.map(article => (
                <div style={cardStyle} key={article.id} onClick={(e) => handleClick(article.id, e)} >
                    <h4>{article.title}</h4>
                    <p style={cutText}>{article.content}</p>
                </div>
            ))}
        </div>
    )
}

export default ArticleList;
