import ArticlePageTemplate from "../components/Articles/ArticlePageTemplate";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticle } from "../http";

const Article = () => {
  const { articleId } = useParams();
  const articleIndex = articleId ? parseInt(articleId, 10) : 0;

  const [isFetching, setIsFetching] = useState(false);
  const [article, setArticle] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSelectedArticle() {
      setIsFetching(true);
      setError(null);

      try {
        const fetchedArticle = await fetchArticle(articleIndex);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("לא ניתן להראות את המאמרים כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }

    fetchSelectedArticle();
  }, [articleIndex]);

  if (isFetching) {
    return <div>טוען את המאמר...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (article) {
    return (
      <ArticlePageTemplate
        headline1={article.headline1 ?? ""}
        headline2={article.headline2 ?? ""}
        author={article.author}
        readingTime={article.readingTime}
        intro={article.intro}
        sections={article.sections}
        quote={article.quote}
        conclusion={article.conclusion}
      />
    );
  }

  return <div>מאמר לא נמצא.</div>;
};

export default Article;
