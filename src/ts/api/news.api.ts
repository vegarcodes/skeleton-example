import type { News } from "../types/News.type";

/**
 * Hent en liste med teknologinyheter fra API-endepunktet til ok.surf.
 * @returns Et Promise som resulterer i et array med nyhetssaker.
 */
export async function getTechnologyNews(): Promise<News[]> {
  try {
    const response: Response = await fetch("https://ok.surf/api/v1/cors/news-feed");

    if (!response.ok) {
      throw new Error("Kunne ikke hente nyheter.");
    }

    const data = await response.json();
    const news = data["Technology"];
    return news;
  } catch (error) {
    throw error;
  }
}
