import _ from "lodash";
import "react-awesome-lightbox/build/style.css";
import Lightbox from "react-awesome-lightbox";
import { useState } from "react";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
const Question = (props) => {
    const { data, index, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return <></>;
    }
    const handleCheckBox = (e, aId, qId) => {
        // console.log('check', e.target.checked)
        console.log("data", aId, qId);
        props.handleCheckBox(aId, qId);
    };
    return (
        <>
            {data.image ? (
                <div className="q-image">
                    <img
                        style={{ cursor: "pointer" }}
                        src={`data:image/jpeg;base64,${data.image}`}
                        onClick={() => {
                            setIsPreviewImage(true);
                        }}
                    />
                    {isPreviewImage === true && (
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => {
                                setIsPreviewImage(false);
                            }}
                        ></Lightbox>
                    )}
                </div>
            ) : (
                <div className="q-image"></div>
            )}
            <div className="question">
                Question{index + 1}: {data.questionDescription}?
            </div>
            <div className="answer">
                {data.answers &&
                    data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        onChange={(e) => {
                                            handleCheckBox(
                                                e,
                                                a.id,
                                                data.questionId
                                            );
                                        }}
                                    />
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                    {isShowAnswer === true && (
                                        <>
                                            {a.isCorrect === false && (
                                                <IoIosClose className="incorrect" />
                                            )}
                                            {a.isCorrect === true && (
                                                <IoIosCheckmark className="correct" />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
export default Question;
