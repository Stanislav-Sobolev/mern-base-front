import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { InputArea, Button } from "../Elements";

import classes from "./Goal.module.scss";

const Goal = ({ goal }) => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const history = useHistory();

  const handleGoalDel = async (id) => {
    try {
      await request(`/api/goal/del/${id}`, "POST", null, {
        Authorization: `Bearer ${token}`,
      });
      history.push("/goals/");
    } catch (e) {}
  };

  const handleSetGoalStatus = async (id) => {
    try {
      await request(`/api/goal/edit/${id}`, "POST", null, {
        Authorization: `Bearer ${token}`,
      });
      history.push("/goals/");
    } catch (e) {}
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapCard}>
          <InputArea
            value={goal.goal}
            onChange={() => {}}
            colorText={goal.colorText}
            colorBg={goal.colorBg}
            img={JSON.parse(goal.image)}
            transform={goal.transform}
          />
          <button
            className={classes.dell}
            onClick={() => handleGoalDel(goal._id)}
          >
            X
          </button>
        </div>
      </div>
      <div className={classes.container}>
        {!goal.status ? (
          <Button onClick={() => handleSetGoalStatus(goal._id)}>
            Выполнено
          </Button>
        ) : (
          <Button onClick={() => handleSetGoalStatus(goal._id)}>
            Не выполнено
          </Button>
        )}
      </div>
    </>
  );
};

Goal.propTypes = {
  goal: PropTypes.object,
};

export default Goal;
