import React from 'react';
import classes from "./InputStyles.module.css";

const GrayInput = (props) => {

    if (props.isMultiLine)
        return (
            <textarea {...props} className={classes.grayTextarea}/>
        );
    return (
        <input {...props} className={classes.grayInput}/>
    );
};

export default GrayInput;