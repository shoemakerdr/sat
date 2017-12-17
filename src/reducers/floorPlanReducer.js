
const newId = (state) => {
    const maxId = state.reduce((current, next) => {
        return Math.max(current.id, next.id)
    })
    return maxId + 1
}

const initialState = () => {
    return []
}

const floorPlanReducer = (state=initialState(), action) => {
    switch (action.type) {
        case 'TOGGLE_SELECT':
            return state.map(coordinate => {
                const isSelected = action.id === coordinate.id
                return { ...coordinate, selected: isSelected }
            })
        case 'ADD_COORDINATE':
            return [...state, { ...action.coordinate, id: newId(state), selected: false }]
        case 'EDIT_COORDINATE':
            return state.map(coordinate => {
                return action.coordinate.id === coordinate.id
                    ? action.coordinate
                    : { ...coordinate }
            })
        case 'REMOVE_COORDINATE':
            return state.filter(coordinate => {
                return action.id !== coordinate.id
            })
        default:
            return state
    }
}

export default floorPlanReducer