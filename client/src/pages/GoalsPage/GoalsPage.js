import React, { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

import { GoalsList } from "../../components/Elements";

import classes from "./GoalsPage.module.scss";

export const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const { loading, request } = useHttp(false);
  const { token } = useContext(AuthContext);
  const [finGet, setFinGet] = useState(false);

  const getGoals = useCallback(async () => {
    try {
      const reqGoals = await request("/api/goal/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setGoals(reqGoals);
      setFinGet(true);
    } catch (e) {}
    // eslint-disable-next-line
  }, [token, request]);

  useEffect(() => {
    getGoals();
  }, [getGoals]);

  if (loading) {
    return <p className={classes.notyf}>...loading...</p>;
  }

  if (finGet && goals.length === 0) {
    return (
      <p className={classes.notyf}> У Вас пока что нету поставленных целей</p>
    );
  }

  return <GoalsList goals={goals} />;
};
