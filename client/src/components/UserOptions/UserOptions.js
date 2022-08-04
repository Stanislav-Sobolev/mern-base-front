import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import imgUser from "../../asset/img/user.jpg";

import classes from "./UserOptions.module.scss";

const UserOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const node = useRef();
  const buttonList = useRef();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", escAndTabFunction);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", escAndTabFunction);
    };
  }, [isOpen]);

  const escAndTabFunction = (event) => {
    if (event.code === "Escape" || event.code === "Tab") {
      setIsOpen(false);
    }
  };

  const handleClick = (e) => {
    if (
      node.current.contains(e.target) ||
      buttonList.current.contains(e.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div ref={buttonList} className={classes.menuButton}>
      <button className={classes.menuButton} onClick={() => setIsOpen(!isOpen)}>
        <img src={imgUser} alt="options user" role="button" />
      </button>
      {isOpen && (
        <div className={classes.wrapBodyMenu} ref={node}>
          <button className={classes.wrapBodyMenu_option}>Профиль</button>
          <button
            className={classes.wrapBodyMenu_option}
            onClick={logoutHandler}
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
};

// UserOptions.propTypes = {};

export default UserOptions;
