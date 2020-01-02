import * as ProjectScreenActType from "./../../actions/project-screen-action/types";
import * as UserScreenActType from "./../../actions/user-screen-action/types";

const initialState = {
  project: null,
  client: null
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case ProjectScreenActType.GET_USER_INFO_SUCCES:
      let { client } = action;
      return {
        ...state,
        client
      };
    case ProjectScreenActType.CLEAR_USER_INFO:
      return {
        ...state,
        client: null
      };
    case ProjectScreenActType.CREATE_PROJECT_SUCCESS:
      let { project } = action;
      return {
        ...state,
        project
      };
    case ProjectScreenActType.CREATE_PROJECT_CLEAR:
      state = initialState;
      return state;
    case UserScreenActType.ACT_CREATE_PROJECT_FOR_USER:
      let { user } = action;
      return {
        ...state,
        client: user,
        project: null
      };
    default:
      return { ...state };
  }
};

export default project;
