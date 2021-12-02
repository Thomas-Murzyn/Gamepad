import { useState } from "react";

const Pagination = ({ data }) => {
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(5);

  const tab = [];

  const pages = () => {
    for (let i = paginate - 4; i <= paginate; i++) {
      tab.push(
        <button
          key={i}
          onClick={() => {
            if (page !== 1 || page !== 2 || page !== 3 || page !== 4) {
              setPage(i);
              setPaginate(page + 2);
              pages();
            }
          }}
        >
          {i}
        </button>
      );
    }

    return tab;
  };

  return <div>{pages()}</div>;
};

export default Pagination;
