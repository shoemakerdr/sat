import React from 'react'
import styles from './styles/ToolTip.css'

const ToolTip = props =>
    <div
        className={props.isVisible ? `${styles.toolTip} ${styles.visible}` : `${styles.hidden}`}
        style={{
            top: props.info.position.y + 10,
            left: props.info.position.x + 20,
        }}>
            <p>Name: {props.info.name}</p>
            <p>Type: {props.info.type}</p>
            <p>Label: {props.info.label}</p>
            <p>Department: {props.info.department}</p>
            <p>Details: {props.info.details}</p>
        </div>

export default ToolTip