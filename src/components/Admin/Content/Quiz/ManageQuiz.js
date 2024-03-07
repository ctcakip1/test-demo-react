import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
const ManageQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD   " },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const handleChangeFile = (e) => {
    if (e.target.value && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    // const quizTypeValue = type && type.value ? type.value : "DEFAULT_VALUE";
    let res = await postCreateNewQuiz(description, name, type.value, image);
    console.log("res: ", res);
  };
  return (
    <div className="quiz-container">
      <div className="title">ManageQuiz</div>
      <hr />
      <div className="add-new">
        <form action="/action_page.php">
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Add new Quiz:</legend>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="your quiz name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label>Description</label>
            </div>
            <div className="my-3">
              <Select
                defaultValue={type}
                onChange={setType}
                options={options}
                placeholder={"Quiz type..."}
              />
            </div>
            <div className="more-action form-group">
              <label className="mb-1">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  handleChangeFile(e);
                }}
              />
            </div>
            <div>
              <button
                className="btn btn-warning mt-3"
                onClick={() => {
                  handleSubmitQuiz();
                }}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};
export default ManageQuiz;
