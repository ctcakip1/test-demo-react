import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation, Trans } from "react-i18next";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD   " },
];
const ManageQuiz = (props) => {
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);
    const handleChangeFile = (e) => {
        if (e.target.value && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleSubmitQuiz = async () => {
        let res = await postCreateNewQuiz(
            description,
            name,
            type?.value,
            image
        );
        //validate
        if (!name || !description) {
            toast.error("Name/Description is required");
        }
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage(null);
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <div className="quiz-container">
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="home" title="Quiz Manage">
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">
                                    {t("m-quiz-parent.m-quiz.add")}
                                </legend>
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
                                    <label>
                                        {t("m-quiz-parent.m-quiz.name")}
                                    </label>
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
                                    <label>
                                        {t("m-quiz-parent.m-quiz.des")}
                                    </label>
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
                                    <label className="mb-1">
                                        {t("m-quiz-parent.m-quiz.upload")}
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => {
                                            handleChangeFile(e);
                                        }}
                                    />
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-warning "
                                        onClick={() => {
                                            handleSubmitQuiz();
                                        }}
                                    >
                                        {t("m-quiz-parent.m-quiz.save")}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz />
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Update Q/A for Quiz">
                        <QuizQA />
                    </Tab>
                    <Tab eventKey="contact" title="Assign Quiz for User">
                        <AssignQuiz />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};
export default ManageQuiz;
