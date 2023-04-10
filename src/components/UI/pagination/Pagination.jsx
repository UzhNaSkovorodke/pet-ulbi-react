import React from "react";
import { getPagesArray } from "../../../utils/page";

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className="navButtons">
      {pagesArray.map((element) => (
        <span
          onClick={() => changePage(element)}
          className={page === element ? "page page__current" : "page"}
          key={element}
        >
          {element}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
