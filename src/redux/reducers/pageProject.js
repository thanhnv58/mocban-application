import * as ProjectScreenActType from "../../actions/project-screen-action/types";
import * as MainScreenActType from "../../actions/auth-action/types";
import { findIndexOfElementInArray } from "./../../utils/arrayUtils";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  projects: [],
  userId: null
};

const pageProject = (state = initialState, action) => {
  let { totalElements, currentTotal, projects } = state;

  let indexUpdateEle = -1;

  switch (action.type) {
    case ProjectScreenActType.FETCH_LIST_PROJECT_SUCCESS:
      let { pageProject } = action;

      return {
        ...state,
        totalElements: pageProject.totalElements,
        totalPage: pageProject.totalPage,
        currentPage: pageProject.currentPage,
        currentTotal: pageProject.elements.length,
        projects: pageProject.elements,
        userId: null
      };
    case ProjectScreenActType.FETCH_LIST_PROJECT_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0,
        userId: null
      };
    case ProjectScreenActType.FETCH_LIST_PROJECT_OF_USER_SUCCESS:
      let { pageProjectOfUser, userId } = action;

      return {
        ...state,
        totalElements: pageProjectOfUser.totalElements,
        totalPage: pageProjectOfUser.totalPage,
        currentPage: pageProjectOfUser.currentPage,
        currentTotal: pageProjectOfUser.elements.length,
        projects: pageProjectOfUser.elements,
        userId: userId
      };
    case ProjectScreenActType.FETCH_LIST_PROJECT_OF_USER_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0,
        userId: action.userId
      };

    case ProjectScreenActType.CREATE_PROJECT_SUCCESS:
      let { project } = action;

      return {
        ...state,
        totalElements: totalElements + 1,
        projects: [project].concat(projects),
        currentTotal: currentTotal + 1
      };
    case ProjectScreenActType.UPDATE_PROJECT_INFO_SUCCESS:
      let { updateProjectRes } = action;
      let { id, name, location, customerRequest, note } = updateProjectRes;

      indexUpdateEle = findIndexOfElementInArray(projects, e => {
        return e.id === id;
      });

      if (indexUpdateEle !== -1) {
        projects[indexUpdateEle] = {
          ...projects[indexUpdateEle],
          name,
          location,
          customerRequest,
          note
        };

        return {
          ...state,
          projects: [...projects]
        };
      } else {
        return { ...state };
      }
    case ProjectScreenActType.CHANGE_PHASE_SUCCESS:
      let { changePhaseRes } = action;
      let { phase, projectId } = changePhaseRes;

      indexUpdateEle = findIndexOfElementInArray(projects, e => {
        return e.id === projectId;
      });

      if (indexUpdateEle !== -1) {
        projects[indexUpdateEle] = {
          ...projects[indexUpdateEle],
          phase
        };

        return {
          ...state,
          projects: [...projects]
        };
      } else {
        return { ...state };
      }
    case ProjectScreenActType.CLOSE_PROJECT_SUCCESS:
      let { closeProjectRes } = action;

      indexUpdateEle = findIndexOfElementInArray(projects, e => {
        return e.id === closeProjectRes.id;
      });

      if (indexUpdateEle !== -1) {
        projects[indexUpdateEle] = {
          ...projects[indexUpdateEle],
          phase: closeProjectRes.phase,
          endDate: closeProjectRes.endDate
        };

        return {
          ...state,
          projects: [...projects]
        };
      } else {
        return { ...state };
      }
    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return { ...state };
    default:
      return { ...state };
  }
};

export default pageProject;
