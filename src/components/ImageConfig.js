import React, { Component } from 'react'
import styles from './styles/ImageConfig.css'

class ImageConfig extends Component {
    constructor () {
        super()
        this.displayFloorPlanImage = this.displayFloorPlanImage.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        this.defaultState = {
            src: null,
            title: 'Floor Plan Title',
            coordinates: []
        }
        this.state = this.defaultState
    }

    changeTitle (event) {
        this.setState({title: event.target.value})
    }

    displayFloorPlanImage (event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader()
            reader.onload = e => this.setState({src: e.target.result})
            reader.readAsDataURL(event.target.files[0])
        }
    }

    getCoordinates (event) {
        const floorPlan = this.img.getBoundingClientRect()
        const top = floorPlan.top + window.scrollY
        const left = floorPlan.left + window.scrollX
        const coordinateY = (event.pageY - top) / floorPlan.height
        const coordinateX = (event.pageX - left) / floorPlan.width
        const newCoordinates = {y: coordinateY, x: coordinateX}
        this.setState({coordinates: [...this.state.coordinates, newCoordinates]})
    }

    render () {
        const { coordinates, src, title } = this.state
        return (
            <form>
                <input type='text' placeholder='Floor Plan Title' onChange={this.changeTitle} />
                <input type='file' onChange={this.displayFloorPlanImage} />
                <div className={styles.floorPlanWrapper}>
                    <img
                        className={styles.floorPlan}
                        src={src}
                        alt=''
                        title={title}
                        ref={img => this.img = img}
                        onClick={this.getCoordinates}
                    />
                    {coordinates.length > 0 &&
                        <div className={styles.coordinates}>
                            {coordinates.map((coor, i) => 
                                <div key={i}>{i + 1}: x - {coor.x}, y - {coor.y}</div>
                            )}
                        </div>}
                </div>
            </form>
        )
    }
}

export default ImageConfig