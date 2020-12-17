import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/button/Button";
import { toggleAlexaMode } from "../../actions/recipeActions";
import { withTranslation } from "../../i18n";

//components
import "../../styles/components/text-block.scss";

const Recipe = ({ t, toggleAlexaMode }) => {
  return (
    <Page title="Recipe" headerType="withMenu">
      <div className="container">
        <Wrapper>
          <div className="text-block">
            <h2 className="text-block__title title-big">
              {t("lets-do-this")}
              <span>{t("chef")}</span>
            </h2>
            <span className="text-block__text">
              {t("what-do-you-want-to-do-first")}
            </span>
          </div>
          <div className="btn-wrapper btn-wrapper--big">
            <Button
              component="link"
              href="/recipe/food"
              className="btn"
              style={{ marginBottom: "15px", padding: "9px 35px" }}
              onClick={() => toggleAlexaMode(false)}
            >
              {t("food")}
            </Button>
            <Button
              component="link"
              href="/recipe/drinks"
              className="btn btn--white"
              onClick={() => toggleAlexaMode(false)}
            >
              {t("drinks")}
            </Button>
            <Button
              component="link"
              href="/recipe/food"
              onClick={() => toggleAlexaMode(true)}
              className="btn btn--alexa"
              style={{ marginBottom: "15px", padding: "9px 35px" }}
            >
              {t("continue-with-alexa")}
            </Button>
            <a
              href="https://open.spotify.com/playlist/1IidQTR2HaahdRQ0W4woop?si=7ca-eB4-TKGp6vW0FabDjA"
              className="btn btn--green"
              target="_blank"
            >
              {t("listen-to-spotify")}
            </a>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

Recipe.getInitialProps = () => ({
  namespacesRequired: ["recipe"]
});

Recipe.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation("recipe")(
  connect(null, { toggleAlexaMode })(Recipe)
);
