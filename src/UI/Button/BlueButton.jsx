import React from 'react';
import classes from "./BtnStyles.module.css";

const BlueButton = (props) => {
    return (
        <button {...props} className={[classes.Btn, classes.DrawBorder].join(' ')}></button>
    );
};

export default BlueButton;