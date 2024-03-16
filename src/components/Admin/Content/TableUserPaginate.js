import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation, Trans } from "react-i18next";

const TableUserPaginate = (props) => {
  const { t } = useTranslation();

  const { listUsers, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">{t("table-u.item1.id")}</th>
            <th scope="col">{t("table-u.item1.username")}</th>
            <th scope="col">{t("table-u.item1.email")}</th>
            <th scope="col">{t("table-u.item1.role")}</th>
            <th>{t("table-u.item1.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        props.handleClickBtnView(item);
                      }}
                    >
                      {t("table-u.item2.view")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        props.handleClickBtnUpdate(item);
                      }}
                    >
                      {t("table-u.item2.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        props.handleClickBtnDelete(item);
                      }}
                    >
                      {t("table-u.item2.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"5"}>{t("table-u.item2.notfound")}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
