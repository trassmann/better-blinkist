import axios from "axios";
import _ from "lodash";

type GetTextMarkersArgs = {
  page: number;
};

export type TextMarker = {
  _id: string;
  book_id: string;
  book_title: string;
  chapter_id: string;
  chapter_path: string;
  chapter_title: string;
  char_from: number;
  char_to: number;
  created_at: string;
  order_no: number;
  text: string;
};

const getTextMarkers = async ({ page }: GetTextMarkersArgs) => {
  try {
    const { data, status } = await axios.get<TextMarker[]>(
      "https://www.blinkist.com/api/textmarkers_v2",
      {
        params: {
          page,
          locale: "de",
          order: "date",
        },
      }
    );

    if (status !== 200) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
};

const PAGES_CHUNK_SIZE = 125;
const ITEMS_PER_PAGE = 10;

type GetAllTextMarkersArgs = {
  previousChunk?: TextMarker[];
  chunkIndex?: number;
};

const getAllTextMarkers = async ({
  previousChunk = [],
  chunkIndex = 0,
}: GetAllTextMarkersArgs = {}): Promise<TextMarker[]> => {
  const pagesRange = _.range(
    chunkIndex * PAGES_CHUNK_SIZE + 1,
    (chunkIndex + 1) * PAGES_CHUNK_SIZE + 1
  );

  const markersChunk = await Promise.all(
    pagesRange.map((page) => getTextMarkers({ page }))
  );

  const newMarkers = _.compact(markersChunk.flat());
  const allMarkers = [...previousChunk, ...newMarkers];

  if (newMarkers.length !== PAGES_CHUNK_SIZE * ITEMS_PER_PAGE) {
    return allMarkers;
  }

  return getAllTextMarkers({
    chunkIndex: chunkIndex + 1,
    previousChunk: allMarkers,
  });
};

export type Chapter = {
  title: string;
  quotes: string[];
  orderNr: number;
};
export type Book = {
  title: string;
  chapters: Chapter[];
  originalSortIdx: number;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const allMarkers = await getAllTextMarkers();
  const groupedBooks = _.groupBy(allMarkers, "book_id");

  return Object.entries(groupedBooks).map(([, bookMarkers], idx) => {
    const groupedChapters = _.groupBy(bookMarkers, "chapter_id");
    const chapters = Object.entries(groupedChapters).map(
      ([, chapterMarkers]) => ({
        title: chapterMarkers?.[0]?.chapter_title ?? "Unknown chapter",
        quotes: _.sortBy(
          chapterMarkers.map((marker) => marker?.text?.trim() ?? ""),
          "char_from"
        ),
        orderNr: chapterMarkers?.[0]?.order_no ?? 0,
      })
    );

    return {
      title: bookMarkers?.[0]?.book_title ?? "Unknown book",
      chapters: _.sortBy(chapters, "orderNr"),
      originalSortIdx: idx,
    };
  });
};
