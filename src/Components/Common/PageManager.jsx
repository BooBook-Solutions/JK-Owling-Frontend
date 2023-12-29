import { useState } from "react";
import { Pagination } from "react-bootstrap";

const PageManager = (items, perPageItems) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = perPageItems >= items?.length ? items?.length : perPageItems;
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageManager = (
        <Pagination>
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}/>
            <span className="mx-2" style={{display: "flex", alignItems: "center"}}>{currentPage}</span>
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= items?.length}/>
        </Pagination>
    )

    return { pageManager, currentItems }
}

export default PageManager;