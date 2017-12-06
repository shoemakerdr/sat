import React, { Component } from 'react'
import styles from './styles/ImageConfig.css'

class ImageConfig extends Component {
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
        const { coordinates, src, title } = this.state
        return (
            <form>
                <input type='text' placeholder='Floor Plan Title' onChange={this.changeTitle} />
                <input type='file' onChange={this.displayFloorPlan} />
                <div className={styles.floorPlanWrapper}>
                    <img
                        className={styles.floorPlan}
                        src={src}
                        alt=''
                        title={title}
                        ref={img => this.img = img}
                        onClick={this.getCoordinates}
                    />
                    {src &&
                        <div>
                            <input type='text' placeholder='Name' onChange={this.changeName} />
                            <div>
                                <input type='radio' id='labelDesk'
                                name='type' value='desk' />
                                <label htmlFor='labelDesk'>Desk</label>

                                <input type='radio' id='labelOffice'
                                name='type' value='office' />
                                <label htmlFor='labelOffice'>Office</label>

                                <input type='radio' id='labelConferenceRoom'
                                name='type' value='conference room' />
                                <label htmlFor='labelConferenceRoom'>Conference Room</label>
                            </div>
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

export default ImageConfig