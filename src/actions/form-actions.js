
// -- ACTION TYPES -- \\
const SELECT_COORDINATE_TYPE = 'SELECT_COORDINATE_TYPE'
const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_DEPARTMENT = 'CHANGE_DEPARTMENT'
const CHANGE_DETAILS = 'CHANGE_DETAILS'
const SET_POINT = 'SET_POINT'
const SAVE_COORDINATE = 'SAVE_COORDINATE'


// -- ACTION CREATORS -- \\
export const selectCoordinateType = coordinateType => {
    return { type: SELECT_POINT_TYPE, coordinateType }
}
export const changeName = name => {
    return { type: CHANGE_NAME, name }
}
export const changeLabel = label => {
    return { type: CHANGE_LABEL, label }
}
export const changeDepartment = department => {
    return { type: CHANGE_DEPARTMENT, department }
}
export const changeDetails = details => {
    return { type: CHANGE_DETAILS, details }
}
export const setPoint = point => {
    return { type: SET_POINT, point }
}
export const saveCoordinate = () => {
    return { type: SAVE_COORDINATE }
}
