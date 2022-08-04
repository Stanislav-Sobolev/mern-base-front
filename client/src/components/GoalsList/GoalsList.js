import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import cn from "classnames";
import classes from "./GoalsList.module.scss";

const GoalsList = ({ goals }) => {
  const parsText = (text) => {
    const wordList = text.split(" ");
    let newText = "";
    wordList.forEach((word, index) => {
      if (index < 3) {
        newText += ` ${word}`;
      }
    });

    if (wordList.length > 3) {
      newText += ".......";
    }
    return newText;
  };

  return (
    <ul className={classes.goalsWrap}>
      {goals.map((goal) => (
        <li key={goal._id} role="button" className={classes.goal}>
          <a className={classes.goalLink} href={`/goal/${goal._id}`}>
            <span
              className={cn(
                classes.status,
                goal.status ? classes.status_true : classes.status_false
              )}
            >
              {goal.status ? `Цель достигнута` : `цель в процессе`}
            </span>
            <span
              style={{
                backgroundColor: goal.colorBg,
                color: goal.colorText,
                padding: "2px",
                borderRadius: "8px",
              }}
            >
              {parsText(goal.goal)}
            </span>
            <span className={classes.date}>
              {moment(goal.date).format("YYYY/MM/DD")}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

GoalsList.propTypes = {
  goals: PropTypes.array,
};

export default GoalsList;
