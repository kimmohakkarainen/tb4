export function initialState(state) {
  return {
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
    currentPasswordValid: null,
    newPasswordValid: null,
    newPasswordInvalid: null,
    newPassword2Valid: null,
    newPassword2Invalid: null
  };
}

export function passwordReducer(state, action) {
  const { currentPassword, newPassword, newPassword2 } = action;

  if (currentPassword != null) {
    return {
      ...state,
      currentPassword: currentPassword,
      currentPasswordValid: true,
      currentPasswordInvalid: false
    };
  } else if (newPassword != null) {
    return {
      ...state,
      newPassword: newPassword,
      newPasswordValid: newPassword.length > 5,
      newPasswordInvalid: newPassword.length < 6,
      newPassword2Valid:
        state.newPassword2 === newPassword && state.newPassword2.length > 5,
      newPassword2Invalid:
        state.newPassword2.length < 6 || state.newPassword2 !== newPassword
    };
  } else if (newPassword2 != null) {
    return {
      ...state,
      newPassword2: newPassword2,
      newPassword2Valid:
        newPassword2 === state.newPassword && newPassword2.length > 5,
      newPassword2Invalid:
        newPassword2.length < 6 || newPassword2 !== state.newPassword
    };
  } else {
    return state;
  }
}
