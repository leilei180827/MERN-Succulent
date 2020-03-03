import React, { Component } from "react";

const Pagination = ({ total, productsPerPage, paginate, currentPage }) => {
  const lastPage = Math.ceil(total / productsPerPage);

  const listItem = () => {
    const lists = [];
    var outOfRange = false;
    for (let i = 1; i <= lastPage; i++) {
      var active = false;
      var listContent = null;
      if (i <= 2 || i >= lastPage - 1 || Math.abs(i - currentPage) <= 1) {
        outOfRange = false;
        listContent = i;
        if (i === currentPage) {
          active = true;
        }
      } else {
        if (!outOfRange) {
          listContent = "...";
        }
        outOfRange = true;
      }
      if (listContent !== null) {
        lists.push(
          <li key={i} className={active ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => paginate(i)}>
              {listContent}
            </button>
          </li>
        );
      }
    }
    return lists;
  };
  return (
    <nav className="mt-2">
      <ul className="pagination justify-content-center">{listItem()}</ul>
    </nav>
  );
};
export default Pagination;
