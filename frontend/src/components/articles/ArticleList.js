import { useHistory } from 'react-router-dom';
import { cardContainerStyleSheet, cardStyleSheet } from './articlesStyles';

const ArticleList = ({ articles }) => {
    const containerStyle = cardContainerStyleSheet();
    const cardStyle = cardStyleSheet();
    const cutText = {
        width: "230px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "10px",
        fontSize: "1.3rem",
        background: "white",
    };

    const history = useHistory();
    const handleClick = id => { history.push('/articles/' + id) };

    const isArrayEmpty = articles === undefined || articles.length == 0;

    return (
        <div style={containerStyle}>
            {isArrayEmpty ?
                <h4>There aren't any articles yet.</h4>
                :
                articles.map(article => (
                    <div style={cardStyle} key={article.id} onClick={(e) => handleClick(article.id, e)} >
                        <h4>{article.title}</h4>
                        <div style={cutText}>{article.content}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default ArticleList;
