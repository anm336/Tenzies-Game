import './App.css';

export default function Box(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="numbox" style={styles} onClick={props.holdDice}>
            <b>{props.num}</b>
        </div>
    )
}