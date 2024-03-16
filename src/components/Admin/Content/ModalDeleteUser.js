import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

const ModalDeleteUser = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    console.log("component res", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUsers();
      props.setCurrentPage(1)
      await props.fetchListUsersWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("d-user.t-1")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {t("d-user.t-2")}{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t("d-user.t-3")}
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
          {t("d-user.t-4")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
