import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

import { Goal } from "../../components/Elements";

export const GoalPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [reqGoal, setReqGoal] = useState(null);
  const goalId = useParams().id;

  const getGoal = useCallback(async () => {
    try {
      const goal = await request(`/api/goal/${goalId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setReqGoal(goal);
    } catch (e) {}
  }, [token, goalId, request]);

  useEffect(() => {
    getGoal();
    // eslint-disable-next-line
  }, [getGoal]);

  if (loading) {
    return <p>...loading...</p>;
  }

  return <>{reqGoal && <Goal goal={reqGoal} />}</>;
};
