import React, { useContext, useEffect, createRef, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import cn from "classnames";
import NotificationSystem from "react-notification-system";

import { Button } from "../../components/Elements";

import classes from "./AuthPage.module.scss";

import logo from "../../asset/img/logo.jpg";
import star from "../../asset/img/star.jpg";

export const AuthPage = () => {
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const auth = useContext(AuthContext);
  const notificationSystem = createRef();

  useEffect(() => {
    const notification = notificationSystem.current;
    if (error) {
      notification.addNotification({
        position: "tc",
        message: error,
        level: "error",
      });
    }
    clearError();
    // eslint-disable-next-line
  }, [error, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHendler = async () => {
    const notification = notificationSystem.current;
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("data", data.message);
      notification.addNotification({
        position: "tc",
        message: data.message,
        level: "success",
      });
    } catch (e) {}
  };

  const loginHendler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div>
      <h1 className={classes.wrapCenter}>
        <img src={logo} className={classes.image} alt="logo golden platform" />
      </h1>
      <h2 className={cn(classes.wrapCenter, classes.wrapCenter_star)}>
        <img src={star} className={classes.image} alt="img start" />
      </h2>

      <div className={classes.wrapControl}>
        <input
          className={classes.input}
          placeholder="enter email"
          id="email"
          type="email"
          name="email"
          onChange={changeHandler}
          value={form.email}
        />
        <input
          className={classes.input}
          placeholder="enter password"
          id="password"
          type="password"
          name="password"
          onChange={changeHandler}
          value={form.password}
        />
      </div>
      <div className={classes.wrapControl}>
        <Button disabled={loading} onClick={loginHendler}>
          Войти
        </Button>
        <Button onClick={registerHendler} disabled={loading}>
          Регистрация
        </Button>
      </div>
      <NotificationSystem ref={notificationSystem} />
    </div>
  );
};
