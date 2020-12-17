import React from "react";
import { connect } from "react-redux";
import Button from "../button/Button";
import PropTypes from "prop-types";
import Menu from "./Menu";

import "../../styles/components/header.scss";
import headerBkgSmall from "../../static/img/header-dots-small.png";
import headerBkgBig from "../../static/img/header-dots-big-1.png";
import logoQuiz from "../../static/img/home-quiz.svg";
import logo from "../../static/img/licor43.svg";

const Header = ({ withMenu, menuType, size, isAuth }) => {
  const headerBackground = {
    backgroundImage:
      "url(" + `${size === "2x" ? headerBkgBig : headerBkgSmall}` + ")",
    backgroundSize: "cover",
    backgroundColor: "#1c1c1c"
  };
  return (
    <div>
      {withMenu ? (
        <div className="header-primary" style={headerBackground}>
          <Button component="link" href={isAuth ? "/welcome" : "/"}>
            <img src={logo} alt="logo" className="header-primary__logo" />
          </Button>
          <Menu type={menuType} />
        </div>
      ) : (
        <div
          className={`${size === "2x" ? "header-big" : "header-small"}`}
          style={headerBackground}
        >
          <Button component="link" href="/">
            <img
              src={size === "2x" ? logoQuiz : logo}
              alt="logo"
              className={`${
                size === "2x" ? "header-big__logo" : "header-small__logo"
              }`}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  withMenu: PropTypes.bool,
  size: PropTypes.string,
  menuType: PropTypes.string
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Header);
