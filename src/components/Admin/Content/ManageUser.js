import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="user-content">
        <div>
          <button>Add ner users</button>
        </div>
        <div>Table users</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};
export default ManageUser;
