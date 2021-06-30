import { useParams } from "react-router";
import { ArticleView } from "./ArticleView";
import { CommentSectionView } from "../comments/CommentSectionView"
import { useEffect, useState } from "react";
import { fetchArticle } from "../../server-requests/requests";

function ArticleScreenView({ isUserLoggedInState,setIsUserLoggedInState }) {
    let { id } = useParams();
    const [article, setArticle] = useState({});

    const topMargin = {
        marginTop: "55px",
    };

    useEffect(() => {
        fetchArticle(id,false)
            .then(newArticle => setArticle(newArticle));
    }, []);

    return (
        <div style={topMargin}>
            <ArticleView article={article} isUserLoggedInState={isUserLoggedInState} setIsUserLoggedInState={setIsUserLoggedInState}/>
            <CommentSectionView articleId={id} isUserLoggedInState={isUserLoggedInState} setIsUserLoggedInState={setIsUserLoggedInState}/>
        </div>
    );
}

export { ArticleScreenView };