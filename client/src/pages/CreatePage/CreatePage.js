import React, { useContext, useState, createRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import { InputArea, Button } from "../../components/Elements";

import classes from "./CreatePage.module.scss";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const notificationSystem = createRef();

  const [goal, setGoal] = useState("");
  const [colorText, setColorText] = useState("#6bb377");
  const [colorBg, setColorBg] = useState("#271c21");
  const [img, setImg] = useState("");
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 100,
  });

  const pressHandler = async (e) => {
    const notification = notificationSystem.current;
    try {
      await request(
        "/api/goal/generate",
        "POST",
        {
          goal,
          colorText,
          colorBg,
          transform,
          status: "false",
          image: JSON.stringify(img),
        },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push("/goals/");
    } catch (e) {
      if (goal.length === 0) {
        notification.addNotification({
          position: "tc",
          message: "Введите текст",
          level: "error",
        });
      } else {
        notification.addNotification({
          position: "tc",
          message: "слишком большая картинка",
          level: "error",
        });
      }
      console.log("error");
    }
  };

  const chooseImgHandler = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(new Blob([e.target.files[0]]));
    reader.onloadend = function () {
      let base64data = reader.result;
      if (
        JSON.stringify(base64data) !==
        `"data:application/octet-stream;base64,dW5kZWZpbmVk"`
      ) {
        setImg(base64data);
        console.log(JSON.stringify(base64data));
      } else {
        setImg("");
      }
    };
  };

  const handleTransform = (e) => {
    switch (e.target.name) {
      case "up":
        console.log(transform.y);
        setTransform({ ...transform, y: transform.y - 10 });
        break;
      case "down":
        setTransform({ ...transform, y: transform.y + 10 });
        break;
      case "left":
        setTransform({ ...transform, x: transform.x - 10 });
        break;
      case "right":
        setTransform({ ...transform, x: transform.x + 10 });
        break;
      case "scale":
        setTransform({ ...transform, scale: e.target.value });
        break;
      case "rotate":
        setTransform({ ...transform, rotate: e.target.value });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className={classes.wrapConstructor}>
        <div className={classes.wrapCard}>
          <InputArea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            maxLength={280}
            placeholder={"Введите описание Вашей цели"}
            colorText={colorText}
            colorBg={colorBg}
            img={img}
            transform={transform}
          />
        </div>
        <div>
          <label htmlFor="colorText">
            <p style={{ color: "white" }}>Цвет букв</p>
            <input
              id="colorText"
              type="color"
              value={colorText}
              onChange={(e) => setColorText(e.target.value)}
              className={classes.colorChange}
            />
          </label>

          <label htmlFor="colorBg">
            <p style={{ color: "white" }}>Цвет заднего фона</p>
            <input
              type="color"
              id="colorBg"
              value={colorBg}
              onChange={(e) => setColorBg(e.target.value)}
              className={classes.colorChange}
            />
          </label>

          <label htmlFor="changeImg">
            <p role="button" className={classes.button}>
              Вставить картинку
            </p>
          </label>
          <input
            id="changeImg"
            onChange={chooseImgHandler}
            accept="image/*"
            type="file"
            alt="your image"
            placeholder="fdsfs"
            className={classes.hidden}
          />
          {img && (
            <div className={classes.transform}>
              <div className={classes.joystickWrap}>
                <div className={classes.joystick}>
                  <p className={classes.title}>Позиция</p>
                  <div>
                    <button onClick={handleTransform} name="up">
                      U
                    </button>
                    <div>
                      <button onClick={handleTransform} name="left">
                        L
                      </button>
                      <button onClick={handleTransform} name="right">
                        R
                      </button>
                    </div>
                    <button onClick={handleTransform} name="down">
                      D
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label>
                  <p style={{ color: "white" }}>{`Размер (%)`}</p>
                  <input
                    onChange={handleTransform}
                    type="number"
                    name="scale"
                    value={transform.scale}
                  />
                </label>
              </div>
              <div>
                <label>
                  <p style={{ color: "white" }}>{`Поворот (угол)`} </p>
                  <input
                    onChange={handleTransform}
                    type="number"
                    name="rotate"
                    value={transform.rotete}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.wrapCreate}>
        <Button onClick={pressHandler}>Создать цель</Button>
      </div>
      <NotificationSystem ref={notificationSystem} />
    </>
  );
};
