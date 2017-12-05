import React, { Component } from 'react'
import styles from './styles/ImageConfig.css'

class ImageConfig extends Component {
    constructor () {
        super()
        this.displayFloorPlanImage = this.displayFloorPlanImage.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        this.floorPlanCoordinates = []
        this.defaultState = {
            floorPlanSrc: null,
            floorPlanTitle: 'Floor Plan Title',
        }
        this.state = this.defaultState
    }

    changeTitle (event) {
        this.setState({floorPlanTitle: event.target.value})
    }

    displayFloorPlanImage (event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader()
            reader.onload = e => this.setState({floorPlanSrc: e.target.result})
            reader.readAsDataURL(event.target.files[0])
        }
    }

    getCoordinates (event) {
        const floorPlan = this.img.getBoundingClientRect()
        const top = floorPlan.top + window.scrollY
        const left = floorPlan.left + window.scrollX
        const floorPlanCoordinateY = (event.pageY - top) / floorPlan.height
        const floorPlanCoordinateX = (event.pageX - left) / floorPlan.width
        this.floorPlanCoordinates.push({top: floorPlanCoordinateY, left: floorPlanCoordinateX})
        console.log(this.floorPlanCoordinates)
    }

    render () {
        return (
            <form>
                <input type='text' placeholder='Floor Plan Title' onChange={this.changeTitle} />
                <input type='file' onChange={this.displayFloorPlanImage} />
                <div className={styles.floorPlanWrapper}>
                    <img
                        className={styles.floorPlan}
                        src={this.state.floorPlanSrc}
                        alt=''
                        title={this.state.floorPlanTitle}
                        ref={img => {this.img = img}}
                        onClick={this.getCoordinates}
                    />
                </div>
            </form>
        )
    }
}

export default ImageConfig