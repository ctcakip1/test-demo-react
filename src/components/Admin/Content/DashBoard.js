import "./DashBoard.scss";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

const DashBoard = (props) => {
  const { t } = useTranslation();

  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchDataOverview();
  }, []);
  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res.EC === 0) {
      setDataOverView(res.DT);
      //process chart data
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: t("dashboard.item3.name1"),
          Qz: Qz,
        },
        {
          name: t("dashboard.item3.name2"),
          Qs: Qs,
        },
        {
          name: t("dashboard.item3.name3"),
          As: As,
        },
      ];
      setDataChart(data);
    }
    console.log("res", res);
  };

  console.log("dataoverview", dataOverView);
  return (
    <div className="dashboard-container">
      {t("dashboard.item1.d")}
      <div className="title">{t("dashboard.item1.title")}</div>
      <div className="content">
        <div className="left-content">
          <div className="child">
            <span className="text-1">{t("dashboard.item2.t-user")}</span>

            <span className="text-2">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.item2.t-quizzes")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.item2.t-questions")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.item2.t-answers")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="right-content">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart width={600} height={300} data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
