import React, { Component } from 'react'
import styles from './styles/FloorPlanEditor.css'
import floorPlanJpg from '../images/floor-plan.jpg'
import ToolTip from './ToolTip'
import SvgMap from './SvgMap'

class FloorPlanEditor extends Component {
    constructor () {
        super()
        this.changeHandler = this.changeHandler.bind(this)
        this.setSvgRef = this.setSvgRef.bind(this)
        this.allowGetCoordinate = this.allowGetCoordinate.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        this.addCoordinate = this.addCoordinate.bind(this)
        this.showToolTip = this.showToolTip.bind(this)
        this.showPossibleToolTip = this.showPossibleToolTip.bind(this)
        this.hideToolTip = this.hideToolTip.bind(this)
        this.saveAll = this.saveAll.bind(this)
        this.defaultState = {
            floorPlan: {
                width: 600,
                height: 400,
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

    changeHandler (event) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }

    allowGetCoordinate () {
        this.setState({canGetCoordinate: true})
    }

    setSvgRef (svg) {
        this.svg = svg
    } 

    getCoordinates (event) {
        if (this.state.canGetCoordinate) {
            const floorPlan = this.svg.getBoundingClientRect()
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
        const { form, possibleCoordinate } = this.state
        const newCoordinates =  this.state.coordinates.slice()
        newCoordinates.push(JSON.parse(JSON.stringify({...form, position: {x: possibleCoordinate.x, y: possibleCoordinate.y}})))
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
            <div>
            {isToolTipVisible && <ToolTip isVisible={isToolTipVisible} info={toolTipInfo} />}
                <div className={styles.floorPlanWrapper}>
                    <SvgMap
                        floorPlan={floorPlan}
                        getCoordinates={this.getCoordinates}
                        canGetCoordinate={canGetCoordinate}
                        coordinates={coordinates}
                        possibleCoordinate={possibleCoordinate}
                        showToolTip={this.showToolTip}
                        setSvgRef={this.setSvgRef}
                        showPossibleToolTip={this.showPossibleToolTip}
                        hideToolTip={this.hideToolTip}
                    />
                    {floorPlan.src &&
                        <div className={styles.flexRight}>
                            {types.length > 0 &&
                                <select name='type' value={form.type} onChange={this.changeHandler}>
                                    <option value='Select a type' disabled>Select a type</option>
                                    {types.map((type, i) => {
                                        return <option key={i} value={type.text}>{type.text}</option>
                                    })}
                                </select>}
                            <input name='name' type='text' placeholder='Name' onChange={this.changeHandler} value={form.name} />
                            <input name='label' type='text' placeholder='Label' onChange={this.changeHandler} value={form.label} />
                            <input name='department' type='text' placeholder='Department' onChange={this.changeHandler} value={form.department} />
                            <input name='details' type='text' placeholder='Details' onChange={this.changeHandler} value={form.details} />
                            <button type='button' onClick={this.allowGetCoordinate}>{canGetCoordinate ? 'Click Map To Set': 'Set Position'}</button>
                            <button type='button' onClick={this.addCoordinate}>Save Coordinate</button>
                        </div>}
                </div>
                <button onClick={this.saveAll}>Save</button>
            </div>
        )
    }
}

export default FloorPlanEditor