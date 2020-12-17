import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/button/Button";
import { answerQuestion } from "../../actions/quizActions";
import Spinner from "../../components/spinner/Spinner";
import { BASE_URL } from "../../util/varibales";

//components
import "../../styles/components/text-block.scss";
import "../../styles/components/quiz-question.scss";
import "../../styles/components/forms.scss";

import questionIcon from "../../static/img/question.svg";
import playButtonIcon from "../../static/img/play-solid.svg";
import pauseButtonIcon from "../../static/img/pause-solid.svg";

const QuizQuestion = ({ quiz, users, answerQuestion }) => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [playing, setPlaying] = useState(false);
  const { question, categories, username, isLoading } = quiz;
  // Finding category name
  const categoryName = categories.filter(
    item => item.id === question.category
  )[0].name;
  // Find socket_id by the username
  const socket_id = users.filter(user => user.name === username)[0].id;

  return (
    <Page title="Quiz - Question" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div className="text-block">
            <h2 className="text-block__title title-big">
              {categoryName.split(" ")[0] + " " + categoryName.split(" ")[1]}
              <span>
                {categoryName.substr(
                  categoryName.split(" ")[0].length +
                    categoryName.split(" ")[1].length +
                    1
                )}
              </span>
              <img
                src={questionIcon}
                alt=""
                className="text-block__title-img"
              />
            </h2>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {question.category !== 3 ? (
                <div className="quiz-question-wrap">
                  <div className="quiz-question">
                    <img
                      src={`${BASE_URL}/storage/questions/${question.image}`}
                      alt=""
                      className="quiz-question__img"
                    />
                    <span className="quiz-question__text">
                      {question.description}
                    </span>
                  </div>
                  <div className="quiz-question__answer">
                    <input
                      type="text"
                      className="input"
                      name="answer"
                      placeholder="Your Answer"
                      placeholder="Your Answer"
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
              ) : (
                <div className="quiz-question-wrap">
                  <div className="quiz-question--audio">
                    {playing ? (
                      <img
                        src={pauseButtonIcon}
                        alt="pause-button"
                        style={{ width: 60 }}
                        onClick={() => setPlaying(false)}
                      />
                    ) : (
                      <img
                        src={playButtonIcon}
                        alt="play-button"
                        style={{ width: 60 }}
                        onClick={() => setPlaying(true)}
                      />
                    )}
                    {playing && (
                      <ReactPlayer
                        url={`${BASE_URL}/storage/${question.audio}`}
                        playing
                        config={{
                          file: {
                            forceAudio: true
                          }
                        }}
                        width={0}
                        heigh={0}
                        onEnded={() => setPlaying(false)}
                      />
                    )}
                  </div>
                  <div className="quiz-question__answer">
                    <input
                      type="text"
                      className="input"
                      name="answer"
                      placeholder="Your Answer"
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <div className="btn-wrapper">
            <Button
              className="btn btn--p16"
              onClick={() =>
                answerQuestion(socket_id, question.id, answer, router)
              }
            >
              Submit your Answer
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

const mapStateToProps = state => ({
  quiz: state.quiz,
  users: state.echo.users
});

export default connect(mapStateToProps, { answerQuestion })(QuizQuestion);
