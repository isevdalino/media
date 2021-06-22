import { useParams } from "react-router";
import MOCK_COMMENTS from "../../mock-data/mock-comment";
import { ArticleView } from "./ArticleView";
import { CommentSectionView } from "../comments/CommentSectionView"
import { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../../constants/Paths";
import { Article } from "../../models/article";

function ArticleScreenView() {
    let { id } = useParams();
    const [article, setArticle] = useState({});

    const topMargin = {
        marginTop: "55px",
    };

    useEffect(() => {
        const requestOptions = {
            method: 'GET'
        };

        fetch(SERVER_ADDRESS + "articles/" + id, requestOptions)
            .then(response => response.json())
            .then(data => setArticle(new Article(data._id, data.name, data.authorName, data.content, data.topic)));
    }, [article]);

    let comment = MOCK_COMMENTS;

    return (
        <div style={topMargin}>
            <ArticleView article={article} />
            <CommentSectionView comments={comment} article={article} />
        </div>
    );
}

export { ArticleScreenView };