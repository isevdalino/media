import { useParams } from "react-router";
import MOCK_ARTICLES from "../../mock-data/mock-articles";
import MOCK_COMMENTS from "../../mock-data/mock-comment";
import { ArticleView } from "./ArticleView";
import { CommentSectionView } from "../comments/CommentSectionView"

function ArticleScreenView() {
    let { id } = useParams();
    const topMargin = {
        marginTop: "55px",
    };

    let article = MOCK_ARTICLES.find(article => article.id == id);
    let comment = MOCK_COMMENTS;

    return (
        <div style={topMargin}>
            <ArticleView article={article} />
            <CommentSectionView comments={comment} article={article} />
        </div>
    );
}

export { ArticleScreenView };