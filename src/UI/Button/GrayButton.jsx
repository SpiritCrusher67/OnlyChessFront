import React from 'react';
import classes from "./BtnStyles.module.css";

const GrayButton = (props) => {
    return (
        <button {...props} className={classes.btn + ' ' + classes.grayBtn}></button>
    );
};

export default GrayButton;