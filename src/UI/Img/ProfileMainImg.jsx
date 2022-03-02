import React from 'react';
import classes from "./ProfileMainImg.module.css"

const ProfileMainImg = (props) => {
    return (
        <img
            src={props.src}
            alt={props.alt} className={classes.MainImg}
        />
    );
};

export default ProfileMainImg;