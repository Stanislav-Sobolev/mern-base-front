import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { CreatePage } from "./pages/CreatePage/CreatePage";
import { GoalsPage } from "./pages/GoalsPage/GoalsPage";
import { GoalPage } from "./pages/GoalPage/GoalPage";

export const useRoutes = (isAuthentificated) => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route path="/goals" exact>
          <GoalsPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/goal/:id">
          <GoalPage />
        </Route>
        <Redirect to="/goals" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
