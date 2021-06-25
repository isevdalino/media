import { useParams } from "react-router";
import MOCK_COMMENTS from "../../mock-data/mock-comment";
import MOCK_PHOTO_ARTICLES from "../../mock-data/mock-photo-articles";
import { CommentSectionView } from "../comments/CommentSectionView"
import { PhotoArticleView } from "./PhotoArticleView";

function PhotoArticleScreenView() {
    let { id } = useParams();
    const topMargin = {
        marginTop: "55px",
    };

    let photoArticle = MOCK_PHOTO_ARTICLES.find(photoArticle => photoArticle.id == id);
    let comments = MOCK_COMMENTS;

    return (
        <div style={topMargin}>
            <PhotoArticleView photoArticle={photoArticle} />
            <CommentSectionView comments={comments} article={photoArticle} />
        </div>
    );
}

export { PhotoArticleScreenView };