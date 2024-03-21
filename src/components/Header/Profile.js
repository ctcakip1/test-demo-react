import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Profile.scss";
import Password from "./Password";
import UserInfor from "./UserInfor";
import History from "./History";
import { useState } from "react";
const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
 
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Main info">
              <UserInfor
                show={show}
                setShow={setShow}
              />
            </Tab>
            <Tab eventKey="profile" title="Password">
              <Password show={show} setShow={setShow} />
            </Tab>
            <Tab
              eventKey="history"
              title="History"
              className="list-quiz-container container"
            >
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
