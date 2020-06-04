export const state = () => ({
  user_uid: null,
  token: null
});

export const mutations = {
  updateUser(state, user) {
    state.user = user;
    state.user_id=user.user_id;
    state.token=user.token;
  }
};
