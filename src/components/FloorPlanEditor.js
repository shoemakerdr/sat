import React, { Component } from 'react'
import styles from './styles/FloorPlanEditor.css'
import floorPlanJpg from '../images/floor-plan.jpg'
import ToolTip from './ToolTip'

const svgStyle = plan => {
    return {
        width: plan.width + 'px',
        height: plan.height + 'px',
        background: `url(${plan.src})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
    }
}

class FloorPlanEditor extends Component {
    constructor () {
        super()
        this.changeName = this.changeName.bind(this)
        this.changeType = this.changeType.bind(this)
        this.changeLabel = this.changeLabel.bind(this)
        this.changeDepartment = this.changeDepartment.bind(this)
        this.changeDetails = this.changeDetails.bind(this)
        this.allowGetCoordinate = this.allowGetCoordinate.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        this.addCoordinate = this.addCoordinate.bind(this)
        this.showToolTip = this.showToolTip.bind(this)
        this.showPossibleToolTip = this.showPossibleToolTip.bind(this)
        this.hideToolTip = this.hideToolTip.bind(this)
        this.saveAll = this.saveAll.bind(this)
        this.defaultState = {
            floorPlan: {
                width: 1200,
                height: 800,
                src: floorPlanJpg,
                title: 'Floor Plan',
            },
            form: {
                name: '',
                type: 'Select a type',
                label: '',
                department: '',
                details: '',
            },
            coordinates: [],
            possibleCoordinate: null,
            canGetCoordinate: false,
            isToolTipVisible: false,
            toolTipInfo: {
                position: {x: 0, y: 0},
                name: '',
                type: '',
                label: '',
                department: '',
                details: '',
            },
            types: [
                {value:'desk', text: 'Desk'},
                {value:'office', text: 'Office'},
                {value:'conference-room', text: 'Conference Room'},
            ],
        }
        this.state = this.defaultState
    }

    changeName (event) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                name: event.target.value,
                }
        })
    }

    changeType (event) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                type: event.target.value,
                }
        })
    }

    changeLabel (event) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                label: event.target.value,
                }
        })
    }

    changeDepartment (event) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                department: event.target.value,
                }
        })
    }

    changeDetails (event) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                details: event.target.value,
                }
        })
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
            const newCoordinate = {y: coordinateY, x: coordinateX}
            this.setState(prevState => {
                return {
                    possibleCoordinate: newCoordinate,
                    canGetCoordinate: false,
                }
            })
        }
    }

    addCoordinate (event) {
        const { toolTipInfo, possibleCoordinate } = this.state
        const newCoordinates =  this.state.coordinates.slice()
        newCoordinates.push(JSON.parse(JSON.stringify({...toolTipInfo, position: {x: possibleCoordinate.x, y: possibleCoordinate.y}})))
        this.setState({
            ...this.defaultState,
            coordinates: newCoordinates,
        })
    }

    showToolTip (index) {
        const coordinate = this.state.coordinates[index]
        return event => {
            this.setState({
                isToolTipVisible: true,
                toolTipInfo: {
                    position: {x: event.pageX, y: event.pageY},
                    name: coordinate.name,
                    type: coordinate.type,
                    label: coordinate.label,
                    department: coordinate.department,
                    details: coordinate.details,
                }
            })
        }
    }

    showPossibleToolTip (event) {
        event.stopPropagation()
        console.log('tool tip showing')
        const { form } = this.state
        this.setState({
            isToolTipVisible: true,
            toolTipInfo: {
                position: {x: event.pageX, y: event.pageY},
                name: form.name,
                type: form.type,
                label: form.label,
                department: form.department,
                details: form.details,
            }
        })
    }

    hideToolTip (event) {
        event.stopPropagation()
        this.setState({isToolTipVisible: false})
    }

    saveAll (event) {
        event.preventDefault()
    }

    render () {
        const {
            coordinates,
            canGetCoordinate,
            types,
            floorPlan,
            possibleCoordinate,
            isToolTipVisible,
            toolTipInfo,
            form,
        } = this.state
        return (
            <form onSubmit={this.saveAll}>
            {isToolTipVisible && <ToolTip isVisible={isToolTipVisible} info={toolTipInfo} />}
                <div className={styles.floorPlanWrapper}>
                    <svg
                        style={svgStyle(floorPlan)}
                        className={canGetCoordinate ? `${styles.floorPlan} ${styles.crosshair}` : styles.floorPlan}
                        title={floorPlan.title}
                        ref={img => this.img = img}
                        onClick={this.getCoordinates}
                    >
                        {coordinates.length > 0 &&
                            coordinates.map((coor,i) => {
                                return (
                                    <circle
                                        key={i}
                                        cx={floorPlan.width * coor.position.x}
                                        cy={floorPlan.height * coor.position.y}
                                        r='8'
                                        fill='gray'
                                        fillOpacity='0.5'
                                        onMouseOver={this.showToolTip(i)}
                                        onMouseOut={this.hideToolTip}
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
                                onMouseEnter={this.showPossibleToolTip}
                                onMouseOut={this.hideToolTip}
                            ></circle>}
                    </svg>
                    {floorPlan.src &&
                        <div className={styles.flexRight}>
                            {types.length > 0 &&
                                <select value={form.type} onChange={this.changeType}>
                                    <option value='Select a type' disabled>Select a type</option>
                                    {types.map((type, i) => {
                                        const id = `type-${type.value}`
                                        return <option key={i} id={id} value={type.text}>{type.text}</option>
                                    })}
                                </select>}
                            <input type='text' placeholder='Name' onChange={this.changeName} value={form.name} />
                            <input type='text' placeholder='Label' onChange={this.changeLabel} value={form.label} />
                            <input type='text' placeholder='Department' onChange={this.changeDepartment} value={form.department} />
                            <input type='text' placeholder='Details' onChange={this.changeDetails} value={form.details} />
                            <button type='button' onClick={this.allowGetCoordinate}>{canGetCoordinate ? 'Click Map To Set': 'Set Position'}</button>
                            <button type='button' onClick={this.addCoordinate}>Save Coordinate</button>
                        </div>}
                </div>
                <input type='submit' value='Save' />
            </form>
        )
    }
}

export default FloorPlanEditor