import * as React from "react";

import { Book } from "./blinkist";
import { saveBookAsDocX } from "./generateDocx";

export default ({ book }: { book: Book }) => {
  return (
    <div className="book">
      <button
        onClick={() => saveBookAsDocX(book)}
        type="submit"
        className="px-4 rounded border-none font-cera-pro font-medium text-base leading-5 text-center items-center justify-center no-underline outline-none cursor-pointer disabled:cursor-not-allowed bg-midnight text-white hover:bg-deep-black hover:text-white py-3"
      >
        Download {book.title}
      </button>
    </div>
  );
};
