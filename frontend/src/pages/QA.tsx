import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QaTemplate from "../components/Qa/QaTemplate";
import { useEffect, useState } from "react";
import { fetchQA } from "../http";

const QAPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchAvaQA() {
      setIsFetching(true);
      try {
        const questions = await fetchQA();
        setQuestions(questions);
      } catch (error) {
        setError("לא ניתן להראות את השאלות תשובות כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchAvaQA();
  }, []);
  return (
    <>
      {isFetching && <p>טוען שאלות תשובות...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className={window.innerWidth > 991 ? "w-1/2 mb-32" : ""}>
        {questions.map((QA, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h4>{QA.question}</h4> 
            </AccordionSummary>
            <AccordionDetails>
              <QaTemplate answer={QA.answer} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default QAPage;
