import { Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from 'redux/module/question';

const Question = () => {
  const list = useSelector((state) => state.question.list);
  const [questionEl, setQuestionEl] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let questionEl = list.map((question) => {
      let answerEl = question.answer.options.map((option) => {
        return (
          <div className="option" key={option.option_id}>
            {option.option_content}
          </div>
        );
      });

      return (
        <div className="question-box" key={question.question_id}>
          <Card className="question-title" title={question.questionContent}>
            <div className="answer-box">
              <div className="answer-row">{answerEl}</div>
            </div>
          </Card>
        </div>
      );
    });

    setQuestionEl(questionEl);
  }, [list]);

  const handleAddQuestion = () => {
    dispatch(questionActions.addQuestion());
  };

  return (
    <div className="question-area">
      <div className="question-addition-button-area">
        <Button
          id="addButton"
          onClick={() => {
            handleAddQuestion();
          }}
        >
          + 추가
        </Button>
      </div>
      <div className="question-list-box">{questionEl}</div>
    </div>
  );
};

export default Question;
