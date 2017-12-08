import React, { Component } from 'react'
import styles from './styles/UploadFloorPlan.css'

class UploadFloorPlan extends Component {
    constructor () {
        super()
        this.displayFloorPlan = this.displayFloorPlan.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.save = this.save.bind(this)
        this.defaultState = {
            src: null,
            title: 'Floor Plan Title',
        }
        this.state = this.defaultState
    }

    changeTitle (event) {
        this.setState({title: event.target.value})
    }

    displayFloorPlan (event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader()
            reader.onload = e => this.setState({src: e.target.result})
            reader.readAsDataURL(event.target.files[0])
        }
    }

    save (event) {}

    render () {
        const { src, title } = this.state
        return (
            <form>
                <input type='text' placeholder='Floor Plan Title' onChange={this.changeTitle} />
                <input type='file' onChange={this.displayFloorPlan} />
                <button type='button' onClick={this.save} value='Save' />
                <div className={styles.floorPlanWrapper}>
                    <img
                        className={styles.floorPlan}
                        src={src}
                        alt=''
                        title={title}
                    />
                </div>
            </form>
        )
    }
}

export default UploadFloorPlan