import React from 'react';
import classes from "./SmallProfileImg.module.css";

const SmallProfileImg = ({imgSrc, isOnline}) => {
    return (
        <div className={classes.ImgContainer}>
            <img className={classes.SmallImg} src={imgSrc}/>
            <div className={[classes.OnlineIndicator,
                isOnline
                    ? classes.GreenIndicator
                    :isOnline == undefined
                        ? classes.HideIndicator
                        : classes.GrayIndicator
            ].join(' ')}/>
        </div>
    );
};

export default SmallProfileImg;