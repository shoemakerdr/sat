
// -- ACTION TYPES -- \\
const SHOW_COORDINATE = 'SHOW_COORDINATE'
const ADD_COORDINATE = 'ADD_COORDINATE'
const EDIT_COORDINATE = 'EDIT_COORDINATE'
const REMOVE_COORDINATE = 'REMOVE_COORDINATE'

// -- ACTION CREATORS -- \\
export const showCoordinate = id => {
    return { type: SHOW_COORDINATE, id }
}
export const addCoordinate = coordinate => {
    return { type: ADD_COORDINATE, coordinate }
}
export const editCoordinate = coordinate => {
    return { type: EDIT_COORDINATE, coordinate }
}
export const removeCoordinate = id => {
    return { type: REMOVE_COORDINATE, id }
}
