import React from 'react'
import styles from './styles/SvgMap.css'

const svgStyle = plan => {
    return {
        // width: plan.width + 'px',
        // height: plan.height + 'px',
        background: `url(${plan.src})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
    }
}

const SvgMap = props => {
    const {
        floorPlan,
        getCoordinates,
        canGetCoordinate,
        coordinates,
        possibleCoordinate,
        showToolTip,
        setSvgRef,
        showPossibleToolTip,
        hideToolTip,
    } = props
    return (
        <svg
            style={svgStyle(floorPlan)}
            className={canGetCoordinate ? `${styles.floorPlan} ${styles.crosshair}` : styles.floorPlan}
            title={floorPlan.title}
            ref={svg => setSvgRef(svg)}
            onClick={getCoordinates}
            >
            {coordinates.length > 0 &&
                coordinates.map((coor,i) => {
                    return (
                        <circle
                            key={i}
                            cx={floorPlan.width * coor.position.x}
                            cy={floorPlan.height * coor.position.y}
                            className={styles.coordinate}
                            r='8'
                            fill='gray'
                            fillOpacity='0.5'
                            onMouseOver={showToolTip(i)}
                            onMouseOut={hideToolTip}
                        ></circle>
                    )
                })}
            {possibleCoordinate && 
                <circle
                    cx={floorPlan.width * possibleCoordinate.x}
                    cy={floorPlan.height * possibleCoordinate.y}
                    r='8'
                    fill='red'
                    fillOpacity='0.5'
                    onMouseOver={showPossibleToolTip}
                    onMouseOut={hideToolTip}
                ></circle>}
        </svg>
    )
}

export default SvgMap