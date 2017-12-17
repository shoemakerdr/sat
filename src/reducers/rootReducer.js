import { combineReducers } from 'redux'

import form from './formReducer'
import floorPlan from './floorPlanReducer'

const rootReducer = combineReducers({
  form,
  floorPlan,
})

export default rootReducer