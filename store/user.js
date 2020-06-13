import Tools from "../functions/tools";

export const state = () => ({
  token: null,
  userGroup: []
});

export const mutations = {
  updateUser(state, user) {
    state.user = user;
    state.user_id = user.user_id;
    state.token = user.token;
  },
  updateUserGroup(state, group) {
    let type = Tools.getType(group);
    if (type == "Array") {
      state.userGroup.push(...group);
    } else if (type == "Object") {
      state.userGroup.push(group);
    }
  }
};
