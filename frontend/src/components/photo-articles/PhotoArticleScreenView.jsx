import { useParams } from "react-router";
import { CommentSectionView } from "../comments/CommentSectionView"
import { PhotoArticleView } from "./PhotoArticleView";
import { useEffect, useState } from "react";
import { fetchArticle } from "../../server-requests/requests";

function PhotoArticleScreenView({ isUserLoggedInState,setIsUserLoggedInState }) {
    let { id } = useParams();
    const [photoArticle, setPhotoArticle] = useState({});

    const topMargin = {
        marginTop: "55px",
    };

    useEffect(() => {
        fetchArticle(id,true)
            .then(newPhotoArticle => setPhotoArticle(newPhotoArticle));
    }, []);

    return (
        <div style={topMargin}>
            <PhotoArticleView photoArticle={photoArticle} isUserLoggedInState={isUserLoggedInState} setIsUserLoggedInState={setIsUserLoggedInState}/>
            <CommentSectionView articleId={id} setIsUserLoggedInState={setIsUserLoggedInState}/>
        </div>
    );
}

export { PhotoArticleScreenView };