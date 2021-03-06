export const UserConstants = {
  UPDATE: "UPDATE",
  RECEIVE_UPDATED_USER: "RECEIVE_UPDATED_USER"
};

export const updateUser = user => {
  return ({
  type: UserConstants.UPDATE,
  user
  });
};

export const receiveUpdatedUser = user => ({
  type: UserConstants.RECEIVE_UPDATED_USER,
  user
});
