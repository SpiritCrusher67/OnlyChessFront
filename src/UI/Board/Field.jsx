import React, {useContext, useEffect, useState} from 'react';
import classes from "./Field.module.css"
import ImgService from "../../API/ImgService";
import {GameConnectionContext} from "../../Context/Contextes";

const Field = ({y,x, figureType, figureSide}) => {
    const [isSelected, setIsSelected] = useState(false);
    const {gameConnection, selectedField, setSelectedField, gameId} = useContext(GameConnectionContext)
    const [figure, setFigure] = useState(figureType)
    const [side, setSide] = useState(figureSide)
    const [image, setImage] = useState()
    const [currentY, setCurrentY] = useState(y)
    const [currentX, setCurrentX] = useState(x)

    useEffect(async () => {
        if (figure != undefined & figure != ""){
            setImage(await ImgService.GetFigureImg(side, figure))
        }
        else setImage(undefined)
    }, [figure])

    useEffect(() => {
        if (gameConnection != undefined)
        {
            gameConnection.on("UpdateField", async (y,x,type,side) =>{
                if(currentY == y & currentX == x){
                    setSide(side)
                    if (type != undefined & type != ""){
                        setImage(await ImgService.GetFigureImg(side, type))
                    }
                    setFigure(type)
                }})
                gameConnection.on("SetSelected", (y,x) =>{
                    if(currentY == y & currentX == x)
                        setIsSelected(true)
                })
        }

    }, [gameConnection])

    useEffect(async () => {
        setIsSelected(false)
    }, [selectedField])

    const makeMove = async (e) =>{
        e.stopPropagation()
        e.preventDefault();
        if (selectedField != undefined){
            await gameConnection.invoke("MakeMove", gameId, selectedField.y, selectedField.x, currentY, currentX)
            setSelectedField(undefined)
        }
    }
    const selectAvaliableFields = async (e) =>{
        e.preventDefault();
        setSelectedField( {y:currentY, x: currentX} )
        await gameConnection.invoke("GetAvaliableFields", gameId, currentY, currentX)

    }

    return (
        <div
            className={[(currentY + currentX) % 2 == 0 ? classes.fieldW : classes.fieldB, isSelected ? classes.selected : classes.notSelected].join(' ')}
            onClick={makeMove}
        >
            <img src={image} alt="" onClick={selectAvaliableFields}/>
        </div>
    );
};

export default Field;