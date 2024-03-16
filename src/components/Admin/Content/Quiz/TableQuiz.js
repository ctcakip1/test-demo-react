import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { useNavigate } from "react-router-dom";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useTranslation, Trans } from "react-i18next";

const TableQuiz = (props) => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleUpdateQuiz = (quiz) => {
    setShowModalUpdate(true);
    setDataUpdate(quiz);
  };
  const handleDeleteQuiz = (quiz) => {
    setShowModalDelete(true);
    setDataDelete(quiz);
  };
  return (
    <>
      <div>{t("t-quiz.title-1.l-quiz")}</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">{t("t-quiz.title-1.id")}</th>
            <th scope="col">{t("t-quiz.title-1.name")}</th>
            <th scope="col">{t("t-quiz.title-1.des")}</th>
            <th scope="col">{t("t-quiz.title-1.type")}</th>
            <th scope="col">{t("t-quiz.title-1.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        handleUpdateQuiz(item);
                      }}
                    >
                      {t("t-quiz.title-1.edit")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteQuiz(item);
                      }}
                    >
                      {t("t-quiz.title-1.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        setDataUpdate={setDataUpdate}
      />
      <ModalDeleteQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};
export default TableQuiz;
