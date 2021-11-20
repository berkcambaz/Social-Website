import { Luckt } from "../luckt";

export const USER_GETTERS = {
  GET_USER: "getuser"
}

export const storeUser = new Luckt({
  state: {
    main: {
      id: 0,
      usertag: "berkcambaz",
      username: "Berk Cambaz",
      bio: "CMON INGERLAND SCOR SOM FOKIN GOALS",
      date: new Date(),
      followers: 123,
      following: 456
    },
    users: []
  },
  getters: {
    [USER_GETTERS.GET_USER]: (state) => (userId) => {
      if (state.main.id == userId) return state.main;
      return state.users.find((user) => user.id === userId);
    }
  }
});