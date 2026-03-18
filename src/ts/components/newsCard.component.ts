import type { News } from "../types/News.type";

/**
 * Tegner opp ett eller flere skeleton-elementer som er tomme.
 * @param amount Antall skeleton-elementer du ønsker tegnet opp
 * @returns Et array med ønsket antall tomme skeleton-elementer
 */
export function renderNewsCardSkeleton(amount: number): Element[] {
  const skeletonElements: Element[] = [];

  for (let i: number = 0; i < amount; i++) {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("news-card", "skeleton");
    skeletonElements.push(element);
  }

  return skeletonElements;
}

/**
 * Tegner opp ett enkelt nyhetskort for en angitt nyhetssak fra APIet.
 * @param newsItem Nyhetssaken som skal tegnes opp.
 * @returns Det ferdige HTML-elementet med nyhetssaken.
 */
export function renderNewsCard(newsItem: News): Element {
  const newsCard : HTMLElement = document.createElement("article");
  newsCard.innerHTML = `
    <h2>${newsItem.title}</h2>
    <a href="${newsItem.link}" target="_blank">Les mer her</a>
  `;
  return newsCard;
}