import React from "react";
import { connect } from "react-redux";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import { setCategory, getQuestion } from "../../actions/quizActions";

import cat1 from "../../static/img/cat-1.png";
import cat2 from "../../static/img/cat-2.png";
import cat3 from "../../static/img/cat-3.png";
import cat4 from "../../static/img/cat-4.png";

import "../../styles/components/quiz-category.scss";

const QuizCategories = ({ categories, quiz, setCategory, getQuestion }) => {
  return (
    <Page title="Quiz - Categories" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div className="text-block">
            <h2 className="text-block__title title-big">
              Choose
              <span>a category.</span>
            </h2>
            <div className="quiz-category">
              {categories.map((category, i) => (
                <div className="quiz-category__item" key={category.id}>
                  <div
                    onClick={() => {
                      setCategory(category.id);
                      getQuestion(quiz.id, category.id);
                    }}
                    className="quiz-category__item-text"
                  >
                    <div className="quiz-category__item-img">
                      {i === 0 && <img src={cat1} alt="category" />}
                      {i === 1 && <img src={cat2} alt="category" />}
                      {i === 2 && <img src={cat3} alt="category" />}
                      {i === 3 && <img src={cat4} alt="category" />}
                    </div>
                    <span className="quiz-category__item-text">
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

const mapStateToProps = state => ({
  quiz: state.quiz,
  categories: state.quiz.categories
});

export default connect(mapStateToProps, { setCategory, getQuestion })(
  QuizCategories
);
