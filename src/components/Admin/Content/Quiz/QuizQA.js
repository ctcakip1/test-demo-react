import { useEffect, useState } from "react";
import { TbHeartPlus } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Select from "react-select";
import "./QuizQA.scss";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _, { create } from "lodash";
import "react-awesome-lightbox/build/style.css";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target.value && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      console.log("check file", e.target.files[0]);
      setQuestions(questionsClone);
    }
  };
  const hanleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );

      setQuestions(questionsClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    //validate selectedQuiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("PLS choose a quiz");
      return;
    }
    // validate answer
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }
    // validate question
    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty description for Question ${indexQ1 + 1}`);
      return;
    }
    // submit question
    // Promise.all gọi api paralel(song song) giúp bắt api nhanh hơn
    // nên khi thêm question sẽ không đúng tuần tự
    // await Promise.all(
    //   questions.map(async (question) => {
    //     const q = await postCreateNewQuestionForQuiz(
    //       +selectedQuiz.value,
    //       question.description,
    //       question.imageFile
    //     );
    // submit answer
    //     await Promise.all(question.answers.map(async (answer) => {
    //       await postCreateNewAnswerForQuestion(
    //         answer.description,
    //         answer.isCorrect,
    //         q.DT.id
    //       );
    //     }));
    //   })
    // );
    //submit question
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      //submit answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
      toast.success("create questions and answers succeed");
      setQuestions(initQuestions);
    }
  };
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2 ">Add Questions:</div>
        <div>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={question.id} className="q-main mb-4">
                  <div className="question-content ">
                    <div className="form-floating description">
                      <input
                        type="type"
                        className="form-control "
                        placeholder="name@example.com"
                        value={question.description}
                        onChange={(e) => {
                          handleOnChange(
                            "QUESTION",
                            question.id,
                            e.target.value
                          );
                        }}
                      />
                      <label>Question {index + 1} 's Description</label>
                    </div>
                    <div className="group-upload">
                      <label htmlFor={`${question.id}`}>
                        <RiImageAddFill className="label-up" />
                      </label>
                      <input
                        id={`${question.id}`}
                        type="file"
                        hidden
                        onChange={(e) => {
                          handleOnChangeFileQuestion(question.id, e);
                        }}
                      />
                      <span>
                        {question.imageName ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handlePreviewImage(question.id);
                            }}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          "0 file is uploaded"
                        )}
                      </span>
                    </div>
                    <div className="btn-add">
                      <span
                        onClick={() => {
                          handleAddRemoveQuestion("ADD", "");
                        }}
                      >
                        <TbHeartPlus className="icon-add" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() => {
                            handleAddRemoveQuestion("REMOVE", question.id);
                          }}
                        >
                          <FaRegTrashAlt className="icon-remove" />
                        </span>
                      )}
                    </div>
                  </div>
                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div key={answer.id} className="answers-content">
                          <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(e) => {
                              hanleAnswerQuestion(
                                "CHECKBOX",
                                answer.id,
                                question.id,
                                e.target.checked
                              );
                            }}
                          />
                          <div className="form-floating answer-name">
                            <input
                              value={answer.description}
                              type="type"
                              className="form-control "
                              placeholder="name@example.com"
                              onChange={(e) => {
                                hanleAnswerQuestion(
                                  "INPUT",
                                  answer.id,
                                  question.id,
                                  e.target.value
                                );
                              }}
                            />
                            <label>Answer {index + 1}</label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() => {
                                handleAddRemoveAnswer("ADD", question.id);
                              }}
                            >
                              <AiOutlinePlusCircle className="icon-add" />
                            </span>
                            {question.answers.length > 1 && (
                              <span
                                onClick={() => {
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  );
                                }}
                              >
                                <AiOutlineMinusCircle className="icon-remove" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          {questions && questions.length > 0 && (
            <div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  handleSubmitQuestionForQuiz();
                }}
              >
                Save Question
              </button>
            </div>
          )}
          {isPreviewImage === true && (
            <Lightbox
              image={dataImagePreview.url}
              title={dataImagePreview.title}
              onClose={() => {
                setIsPreviewImage(false);
              }}
            ></Lightbox>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuizQA;
