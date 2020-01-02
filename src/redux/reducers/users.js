import * as UserScreenType from "./../../actions/user-screen-action/types";
import * as MainScreenActType from "../../actions/auth-action/types";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotalUser: 0,
  users: [],
  createNewUser: false,
  isCreateUserSuccess: false
};

const users = (state = initialState, action) => {
  let { users } = state;
  switch (action.type) {
    case UserScreenType.ACT_FETCH_USER_SUCCESS:
      let { pageUser } = action;

      // Case 204
      if (pageUser === null) {
        return { ...state };
      }

      let { totalElements, totalPage, currentPage, elements } = pageUser;

      if (currentPage >= totalPage) {
        currentPage = totalPage - 1;
      }

      if (users.length > 0) {
        const lastUser = users[users.length - 1];

        let newUsers = elements.filter(u => {
          return u.id < lastUser.id;
        });

        users = users.concat(newUsers);
      } else {
        users = users.concat(elements);
      }

      return {
        ...state,
        totalElements,
        totalPage,
        currentPage,
        currentTotalUser: users.length,
        users
      };
    case UserScreenType.ACT_CREATE_USER:
      return {
        ...state,
        isCreateUserSuccess: false
      };
    case UserScreenType.ACT_CREATE_USER_SUCCESS:
      let { newUser } = action;
      users.splice(0, 0, newUser);
      return {
        ...state,
        users,
        currentTotalUser: users.length,
        totalElements: state.totalElements + 1,
        isCreateUserSuccess: true
      };
    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default users;
