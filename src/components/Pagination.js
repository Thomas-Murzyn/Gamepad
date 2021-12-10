import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        <FiArrowLeft />
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
