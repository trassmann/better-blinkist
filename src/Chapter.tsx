import * as React from "react";

import { Chapter } from "./blinkist";

export default ({ chapter }: { chapter: Chapter }) => {
  return (
    <div className="chapter">
      <h3>{chapter.title}</h3>
      {chapter.quotes.map((quote) => (
        <div className="text-markersV2__items__item__highlight">
          <div className="text-markersV2__items__item__highlight--inset">
            <div className="text-markersV2__items__item__highlight__text">
              {quote}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
