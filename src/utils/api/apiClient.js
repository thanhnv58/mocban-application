import axios from "axios";
import { getLocalToken } from "./../../utils/helpers";
import * as toastUtils from "../toastUtils";

const instance = axios.create();

function handleError(error) {
  let { data, status } = error.response;

  let { errorMessage } = data;

  switch (status) {
    case 400:
      toastUtils.toastError(errorMessage);
      return null;
    case 401:
      toastUtils.toastError("Bạn chưa đăng nhập!");
      return null;
    case 403:
      toastUtils.toastError("Bạn không có quyền làm việc này!");
      return null;
    default:
      toastUtils.toastError("Có lỗi hệ thống!");
      return null;
  }
}

export const callApiGet = url => {
  let authObj = getLocalToken();
  let config = {
    headers: {
      Authorization: authObj ? authObj.token : ""
    }
  };

  return instance.get(url, config).catch(handleError);
};

export const callApiPost = (url, body, auth, headers) => {
  let config = null;
  if (auth) {
    config = {
      auth,
      headers
    };
  } else {
    let authObj = getLocalToken();
    config = {
      headers: {
        Authorization: authObj ? authObj.token : "",
        ...headers
      }
    };
  }

  return instance.post(url, body, config).catch(handleError);
};
