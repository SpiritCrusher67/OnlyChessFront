import Field from "./Field";
import classes from "./Board.module.css"

const Board = () => {

    let res = []
    for (let i = 0; i < 8; i++){
        let line = []
        for (let j = 0; j < 8; j++){
            line[j] = <Field y={i} x={j}/>
        }
        res[i] = <div className={classes.fieldLine}>{line}</div>
    }
    return (
        <div className={classes.board}>
            {res}
        </div>
    );
};

export default Board;