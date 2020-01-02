import * as ProjectScreenActType from "../../actions/project-screen-action/types";
import { findIndexOfElementInArray } from "../../utils/arrayUtils";

const initialState = null;

const projectInfo = (state = initialState, action) => {
  let { projectDetails } = state ? state : {};
  let tmp = null;

  switch (action.type) {
    case ProjectScreenActType.FETCH_PROJECT_DETAIL_SUCCESS:
      let { projectDetailRes } = action;
      state = projectDetailRes;
      return {
        ...state
      };
    case ProjectScreenActType.FETCH_PROJECT_DETAIL_NOT_FOUND:
      return null;
    case ProjectScreenActType.UPDATE_PROJECT_INFO_SUCCESS:
      let { updateProjectRes } = action;
      let { name, location, customerRequest, note } = updateProjectRes;

      return {
        ...state,
        name,
        location,
        customerRequest,
        note
      };
    case ProjectScreenActType.CHANGE_PHASE_SUCCESS:
      let { changePhaseRes } = action;
      let { phase } = changePhaseRes;

      projectDetails.push(changePhaseRes.projectDetail);

      return {
        ...state,
        phase
      };
    case ProjectScreenActType.CONFIRM_WORK_SUCCESS:
      let { confirmWorkRes } = action;

      tmp = findIndexOfElementInArray(projectDetails, e => {
        return e.id === confirmWorkRes.id;
      });
      if (tmp !== -1) {
        projectDetails[tmp] = confirmWorkRes;
      }

      return {
        ...state,
        phase: action.phase
      };
    case ProjectScreenActType.UPDATE_PROJECT_DETAIL_SUCCESS:
      let { updateProjectDetailRes } = action;

      tmp = findIndexOfElementInArray(projectDetails, e => {
        return e.id === updateProjectDetailRes.id;
      });
      if (tmp !== -1) {
        projectDetails[tmp] = {
          ...projectDetails[tmp],
          status: updateProjectDetailRes.status,
          progress: parseInt(updateProjectDetailRes.progress),
          note: updateProjectDetailRes.note
        };
      }

      return {
        ...state
      };
    case ProjectScreenActType.CLOSE_PROJECT_SUCCESS:
      let { closeProjectRes } = action;

      return {
        ...state,
        phase: closeProjectRes.phase,
        endDate: closeProjectRes.endDate
      };
    default:
      return state ? { ...state } : null;
  }
};

export default projectInfo;
