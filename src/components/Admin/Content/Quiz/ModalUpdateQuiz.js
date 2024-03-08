import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FcPlus } from "react-icons/fc";
import { applyMiddleware } from "redux";
import { toast } from "react-toastify";
import { putUpdateQuizForAdmin } from "../../../../services/apiService";
import _ from "lodash";
const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setImage("");
    setPreviewImage("");
    setDataUpdate({});
  };
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // update state
      setDescription(dataUpdate.description);
      setName(dataUpdate.name);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const handleUploadImage = (e) => {
    if (e.target.value && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setPreviewImage("");
    }
  };
  const handleSubmitCreateQuiz = async () => {
    // submit data
    let data = await putUpdateQuizForAdmin(
      dataUpdate.id,
      description,
      name,
      type,
      image
    );
    console.log("component res", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
      // props.setCurrentPage(1)
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value={"EASY"}>EASY</option>
                  <option value={"MEDIUM"}>MEDIUM</option>
                  <option value={"HARD"}>HARD</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="lable-upload" htmlFor="lableUpload">
                  <FcPlus />
                  Upload file Image
                </Form.Label>
                <input
                  type="file"
                  id="lableUpload"
                  hidden
                  onChange={(e) => {
                    handleUploadImage(e);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 ">
              <Form.Group as={Col} className="img-preview">
                {previewImage ? (
                  <img src={previewImage} />
                ) : (
                  <span>Preview Image</span>
                )}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitCreateQuiz();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateQuiz;
