import * as UserScreenActType from "../../../../actions/manager/user-screen-action/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";
import { findIndexOfElementInArray } from "../../../../utils/arrayUtils";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  users: []
};

const pageUser = (state = initialState, action) => {
  switch (action.type) {
    case UserScreenActType.GET_ALL_USER_SUCCESS:
      let { pageUserRes } = action;

      return {
        ...state,
        totalElements: pageUserRes.totalElements,
        totalPage: pageUserRes.totalPage,
        currentPage: pageUserRes.currentPage,
        currentTotal: pageUserRes.elements.length,
        users: pageUserRes.elements
      };
    case UserScreenActType.GET_ALL_USER_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0
      };
    case UserScreenActType.CREATE_USER_SUCCESS:
      if (state.users.length > 0) {
        let { createUserResponse } = action;
        state.users.splice(0, 0, createUserResponse);
        return {
          ...state,
          currentTotal: state.currentTotal + 1,
          totalElements: state.totalElements + 1
        };
      } else {
        return {
          ...state
        };
      }
    case UserScreenActType.LOAD_MORE_LIST_USER_SUCCESS:
      let { pageLoadMoreUserRes } = action;

      state.users.push(...pageLoadMoreUserRes.elements);

      return {
        ...state,
        totalElements: pageLoadMoreUserRes.totalElements,
        totalPage: pageLoadMoreUserRes.totalPage,
        currentPage: pageLoadMoreUserRes.currentPage,
        currentTotal: state.users.length
      };

    case UserScreenActType.UPDATE_USER_SUCCESS:
      if (state.users.length > 0) {
        let { updateUserRes } = action;

        let indexUpdate = findIndexOfElementInArray(state.users, u => {
          return u.id === updateUserRes.id;
        });

        if (indexUpdate !== -1) {
          state.users[indexUpdate] = {
            ...updateUserRes
          };
        }

        return {
          ...state
        };
      } else {
        return {
          ...state
        };
      }

    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default pageUser;
