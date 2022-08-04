import React from "react";
import PropTypes from "prop-types";
import classes from "./InputArea.module.scss";

const InputArea = ({
  value,
  onChange,
  placeholder,
  maxLength,
  colorText,
  colorBg,
  img,
  transform,
}) => {
  const handleInput = (e) => {
    if (maxLength) {
      if (e.target.value.length <= maxLength) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <>
      <div className={classes.wrapArea} style={{ backgroundColor: colorBg }}>
        <textarea
          style={{ color: colorText }}
          className={classes.text}
          onChange={handleInput}
          placeholder={placeholder}
          required={true}
          value={value}
        />
        {img && (
          <img
            style={{
              width: `${transform.scale}%`,
              top: transform.y,
              left: transform.x,
              transform: `rotate(${transform.rotate}deg)`,
            }}
            className={classes.image}
            src={"data:image/jpeg;" + img}
            alt="avatar"
          />
        )}
      </div>
      {maxLength && (
        <p className={classes.counter}>
          {value.length} / {maxLength}
        </p>
      )}
    </>
  );
};

InputArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  colorTextL: PropTypes.string,
  colorBg: PropTypes.string,
  img: PropTypes.string,
  transform: PropTypes.object,
};

export default InputArea;
