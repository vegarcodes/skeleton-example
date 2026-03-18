import { getTechnologyNews } from "./api/news.api";
import { renderNewsCard, renderNewsCardSkeleton } from "./components/newsCard.component";

const newsContainer: Element | null = document.getElementById("news");

if (newsContainer !== null) {
  newsContainer.replaceChildren(...renderNewsCardSkeleton(3));

  try {
    const news = await getTechnologyNews();
    const newsCards = news.map((item) => renderNewsCard(item));
    newsContainer.replaceChildren(...newsCards);
  } catch (error) {
    console.log(error);
  }
}
