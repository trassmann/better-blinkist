import { Book, Chapter } from "blinkist";
import { HeadingLevel, Document, Packer, Paragraph, BorderStyle } from "docx";
import { saveAs } from "file-saver";

const createChapter = (chapter: Chapter): Paragraph[] => {
  return [
    new Paragraph({
      text: chapter.title,
      heading: HeadingLevel.HEADING_1,
      spacing: {
        before: 200,
        after: 200,
      },
      border: {
        bottom: {
          color: "auto",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),
    ...chapter.quotes.map(
      (quote) =>
        new Paragraph({
          text: quote,
          bullet: {
            level: 0,
          },
          indent: {
            left: 100,
          },
        })
    ),
  ];
};

export const saveBookAsDocX = async (book: Book) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: book.title,
            heading: HeadingLevel.TITLE,
            spacing: {
              after: 300,
            },
          }),
          ...book.chapters.flatMap((chapter) => createChapter(chapter)),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${book.title}.docx`);
};
