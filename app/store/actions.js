const SWITCH_USER = 'SWITCH_USER';
const UPDATE_ACTION = 'UPDATE_ACTION';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const DELETE_PROFILE = 'DELETE_PROFILE';

// when user sign in / out
function switchUser(user) {
  return {
    type: SWITCH_USER,
    user
  }
}

// when user updates profile
function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    profile
  }
}

// when user sign out
function deleteProfile() {
  return { type: DELETE_PROFILE }
}

function updateAction(data) {
  return {
    type: UPDATE_ACTION,
    data
  };
}

export { SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE, UPDATE_ACTION }
export { switchUser, updateProfile, deleteProfile, updateAction }
