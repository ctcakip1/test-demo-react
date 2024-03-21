import { changePassword } from "../../services/apiService";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Password = (props) => {
  const { show, setShow } = props;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleClose = () => {
    setShow(false);
    setCurrentPassword("");
    setNewPassword("");
  };
  const handleSubmitChangePassword = async () => {
    let res = await changePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
      />
      <Form.Label>New Password</Form.Label>
      <Form.Control
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          handleSubmitChangePassword();
        }}
      >
        Save Password
      </button>
    </>
  );
};
export default Password;
