import { getQuizHistory } from "../../services/apiService";
import { useEffect, useState } from "react";
import moment from "moment";
const History = (props) => {
    const [listQuizHistory, setListQuizHistory] = useState([]);
    useEffect(() => {
        fetchQuizHistory();
    }, []);
    const fetchQuizHistory = async () => {
        let res = await getQuizHistory();
        if (res && res.EC === 0) {
            let newData = res?.DT?.data.map((item) => {
                return {
                    id: item.id,
                    name: item?.quizHistory?.name ?? "",
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    date: moment(item.updatedAt)
                        .utc()
                        .format("DD/MM/YYYY hh:mm:ss A"),
                };
            });
            console.log("data", newData);
            if (newData && newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListQuizHistory(newData);
        }
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Questions</th>
                        <th scope="col">Total Corrects</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizHistory &&
                        listQuizHistory.length > 0 &&
                        listQuizHistory.map((item, index) => {
                            return (
                                <tr key={`table-quiz-history-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            );
                        })}
                    {listQuizHistory && listQuizHistory.length == 0 && (
                        <div>Don't have any history quiz</div>
                    )}
                </tbody>
            </table>
        </>
    );
};
export default History;
