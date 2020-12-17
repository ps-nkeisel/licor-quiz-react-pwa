import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MenuToggler from "./MenuToggler";
import Button from "../button/Button";
import { changeLanguage } from "../../actions/languageActions";
import { i18n, withTranslation } from "../../i18n";
import { isSafari } from "react-device-detect";

import "../../styles/components/menu.scss";
import menuBg from "../../static/img/header-dots-big.png";
import logo from "../../static/img/licor43.svg";

const menuBackground = {
  backgroundImage: "url(" + menuBg + ")"
};

const Menu = ({ user, type, t, changeLanguage }) => {
  const [isMenuOpen, toggleMenuOpen] = useState(false);
  return (
    <div>
      <MenuToggler isMenuOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      <div
        className={`main-menu ${isMenuOpen ? "main-menu--active" : ""}`}
        style={isSafari ? { height: "calc(100vh - 35px)" } : {}}
      >
        <div className="main-menu__header">
          <span className="main-menu__title">{t("hosted-by")}</span>
          {user && <span className="main-menu__text">{user.name}</span>}
        </div>
        <ul style={menuBackground} className="main-menu__list">
          {type === "quiz" ? (
            <>
              <li>
                <Button
                  component="link"
                  href="/quiz/new-game"
                  style={{ fontSize: 22 }}
                >
                  {t("new-game")}
                </Button>
              </li>
              <li>
                <Button
                  component="link"
                  href="/quiz/new-game"
                  style={{ fontSize: 22 }}
                >
                  {t("invite-players")}
                </Button>
              </li>
              <li>
                <Button
                  component="link"
                  href="/quiz/ranking"
                  style={{ fontSize: 22 }}
                >
                  {t("ranking")}
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button component="link" href="/event/setup">
                  {t("invitations")}
                </Button>
              </li>
              <li>
                <Button component="link" href="/event/guests">
                  {t("guest-list")}
                </Button>
              </li>
              <li>
                <Button component="link" href="/selection/food">
                  {t("food-menu")}
                </Button>
              </li>
              <li>
                <Button component="link" href="/selection/drinks">
                  {t("drinks-menu")}
                </Button>
              </li>
              <li>
                <Button component="link" href="/music">
                  {t("music")}
                </Button>
              </li>
              <li>
                <Button component="link" href="/quiz/welcome">
                  {t("home-quiz")}
                </Button>
              </li>
            </>
          )}
        </ul>
        <div className="main-menu__logo" style={menuBackground}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  type: PropTypes.string,
  changeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withTranslation("menu")(
  connect(mapStateToProps, { changeLanguage })(Menu)
);
