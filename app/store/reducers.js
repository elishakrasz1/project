import { combineReducers } from 'redux';

import { SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE, UPDATE_ACTION } from './actions';

const backQu = {
  id: '',
  cProjectId: '',
  projectName: '',
  signatureDate: '',
  serviceCommencement: '',
  contractDurationMonth: '',
  contractValueUsd: '',
  projectedMargin: '',
  componentOfBespoke: '',
  oftenProvideServices: '',
  isTransitionPlan: '',
  transitionPlanDate: '',
  isTransitionCharges: '',
  transitionCharges: '',
  isTransformationPlan: '',
  transformationPlanStart: '',
  transformationPlanEend: '',
  serviceLevelsWithCredit: '',
  isEarnBack: '',
  isCustomerSatisfactionReport: '',
  customerSatisfactionForm: '',
  governanceType: '',
  governanceOften: '',
  keyPersonnel: '',
  supplierPersonnel: '',
  customerPersonnel: '',
  plannedNegotiationMonth: '',
  negotiationsMonth: '',
  soleSourced: '',
  proposedPeriodWeeks: '',
  actualPeriodWeeks: '',
  isDueDiligenceCompleted: '',
  agreementParty: '',
  typeOfService: '',
  currency: '',
  serviceLevelWithoutCredit: '',
  serviceLevelCapPercentage: '',
  serviceCredeitCapType: ''
}
const initialState = backQu

function user(state={}, action) {
  switch(action.type) {
    case SWITCH_USER:
      return action.user;
    default:
      return state;
  }
}

function profile(state={}, action) {
  switch(action.type) {
    case UPDATE_PROFILE:
      return Object.assign(
        {},
        state,
        action.profile
      );
    case DELETE_PROFILE:
      return null;
    default:
      return state;
  }
}
function update_action(state={}, action) {
  switch(action.type) {
    case UPDATE_ACTION: 
    // return {
    //   ...state,
    //   data: {
    //     ...state.data,
    //     ...payload
    //   }
    // }
      return Object.assign(
        {},
        state,
        action.update_action
      );
    default:
      return state;
  }
}
// function complexForm()

const UserProfile = combineReducers({
  user,
  profile,
  update_action
});

export default UserProfile;
