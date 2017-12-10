import React, { Component } from 'react'
import styles from './styles/FloorPlanEditor.css'

class FloorPlanEditor extends Component {
    constructor () {
        super()
        this.displayFloorPlan = this.displayFloorPlan.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeLabel = this.changeLabel.bind(this)
        this.changeDepartment = this.changeDepartment.bind(this)
        this.changeDetails = this.changeDetails.bind(this)
        this.allowGetCoordinate = this.allowGetCoordinate.bind(this)
        this.defaultState = {
            src: null,
            title: 'Floor Plan Title',
            coordinates: null,
            canGetCoordinate: false,
            types: [
                {value:'desk', text: 'Desk'},
                {value:'office', text: 'Office'},
                {value:'conference-room', text: 'Conference Room'},
            ],
        }
        this.state = this.defaultState
    }

    changeTitle (event) {
        this.setState({title: event.target.value})
    }

    changeName (event) {}

    changeLabel (event) {}

    changeDepartment (event) {}

    changeDetails (event) {}

    displayFloorPlan (event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader()
            reader.onload = e => this.setState({src: e.target.result})
            reader.readAsDataURL(event.target.files[0])
        }
    }

    allowGetCoordinate () {
        this.setState({canGetCoordinate: true})
    }

    getCoordinates (event) {
        if (this.state.canGetCoordinate) {
            const floorPlan = this.img.getBoundingClientRect()
            const top = floorPlan.top + window.scrollY
            const left = floorPlan.left + window.scrollX
            const coordinateY = (event.pageY - top) / floorPlan.height
            const coordinateX = (event.pageX - left) / floorPlan.width
            const newCoordinates = {y: coordinateY, x: coordinateX}
            this.setState({
                coordinates: newCoordinates,
                canGetCoordinate: false,
            })
        }
    }

    render () {
        const { coordinates, src, title, canGetCoordinate, types } = this.state
        return (
            <form>
                <input type='text' placeholder='Floor Plan Title' onChange={this.changeTitle} />
                <input type='file' onChange={this.displayFloorPlan} />
                <div className={styles.floorPlanWrapper}>
                    <img
                        className={canGetCoordinate ? `${styles.floorPlan} ${styles.crosshair}` : styles.floorPlan}
                        src={src}
                        alt=''
                        title={title}
                        ref={img => this.img = img}
                        onClick={this.getCoordinates}
                    />
                    {src &&
                        <div className={styles.flexRight}>
                            <input type='text' placeholder='Name' onChange={this.changeName} />
                            {types.length > 0 &&
                                <div>
                                    {types.map((type, i) => {
                                        const id = `type-${type.value}`
                                        return (
                                            <div className={styles.flexRowRight} key={i}>
                                                <input
                                                    type='radio'
                                                    id={id}
                                                    name='type'
                                                    value={type.value}
                                                />
                                                <label htmlFor={id}>{type.text}</label>
                                            </div>
                                        )
                                    })}
                                </div>}
                            <input type='text' placeholder='Label' onChange={this.changeLabel} />
                            <input type='text' placeholder='Department' onChange={this.changeDepartment} />
                            <input type='text' placeholder='Details' onChange={this.changeDetails} />
                            <button type='button' onClick={this.allowGetCoordinate}>Set Coordinate</button>
                            {coordinates &&
                                <div className={styles.coordinates}>
                                    <div>x: {coordinates.x}, y: {coordinates.y}</div>
                                </div>}
                        </div>}
                </div>
            </form>
        )
    }
}

export default FloorPlanEditor