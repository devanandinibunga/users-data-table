import React, { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import "./user-data-table.scss";

export const UserDataTable = ({ userData, error, isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [rowUserDetails, setRowUserDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    debouncedFunction();
    return () => {
      clearTimeout(debouncedFunction);
    };
  }, [searchText]);
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const filteredUserData = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      user.company.name
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase()) ||
      user.address.city
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase()),
  );
  const currentData = filteredUserData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const handleSort = (columnKey) => {
    if (sortedColumn === columnKey) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortedColumn(columnKey);
      setSortOrder("asc");
    }
  };
  const getSortedData = () => {
    if (!sortedColumn) return currentData;

    return [...currentData].sort((a, b) => {
      const getValue = (obj, path) =>
        path.split(".").reduce((acc, key) => acc?.[key], obj);

      const valueA = getValue(a, sortedColumn);
      const valueB = getValue(b, sortedColumn);

      if (typeof valueA === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  };
  const sortedData = getSortedData();

  const getSortIcon = (columnKey) => {
    if (sortedColumn !== columnKey) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleRowClick = (user) => {
    setRowUserDetails(user);
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };
  return (
    <div className="user-data-table-wrapper">
      <h1>User's Data Table</h1>
      <input
        placeholder="Search name, email, company name, city"
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" onClick={() => handleSort("id")}>
                S.NO
                {getSortIcon("id")}
              </th>
              <th scope="col" onClick={() => handleSort("name")}>
                Name {getSortIcon("name")}
              </th>
              <th scope="col" onClick={() => handleSort("email")}>
                Email {getSortIcon("email")}
              </th>
              <th scope="col" onClick={() => handleSort("company.name")}>
                Company Name {getSortIcon("company.name")}
              </th>
              <th scope="col" onClick={() => handleSort("address.city")}>
                City {getSortIcon("address.city")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                className={
                  rowUserDetails?.id === user.id ? "highlight-row" : ""
                }
              >
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-wrapper">
        <div>
          <span>Rows per page: </span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-secondary mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
      {rowUserDetails && (
        <>
          <h5>Selected User Details</h5>
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                <strong>Name: </strong>
                {rowUserDetails?.name}
              </p>
              <p className="card-text">
                <strong>Email: </strong>
                {rowUserDetails?.email}
              </p>
              <p className="card-text">
                <strong>Address: </strong>
                {rowUserDetails?.address?.street},{" "}
                {rowUserDetails?.address?.suite},{" "}
                {rowUserDetails?.address?.city},{" "}
                {rowUserDetails?.address?.zipcode}.
              </p>
              <p className="card-text">
                <strong>Company Details: </strong>
                {rowUserDetails?.company?.name},{" "}
                {rowUserDetails?.company?.catchPhrase},{" "}
                {rowUserDetails?.company?.bs}.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
