
const initialState = () => {
    return {
        coordinateType: 'Select a type',
        name: '',
        label: '',
        department: '',
        details: '',
        point: { x: 0, y: 0 },
    }
}

const formReducer = (state=initialState(), action) => {
    switch (action.type) {
        case 'SELECT_COORDINATE_TYPE':
            return { ...state, point: {...state.point},  coordinateType: action.coordinateType }
        case 'CHANGE_NAME':
            return { ...state, point: {...state.point},  name: action.name }
        case 'CHANGE_LABEL':
            return { ...state, point: {...state.point},  label: action.label }
        case 'CHANGE_DEPARTMENT':
            return { ...state, point: {...state.point},  department: action.department }
        case 'CHANGE_DETAILS':
            return { ...state, point: {...state.point},  details: action.details }
        case 'SET_POINT':
            return { ...state, point: action.point }
        case 'CLEAR_FORM':
            return initialState()
        default:
            return state
    }
}

export default formReducer
