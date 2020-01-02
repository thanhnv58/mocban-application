import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

export const getStatisOfMonthOfUserLogin = (year, month) => {
  const url = `${BASE_URL}/api/v1/statistic-of-month/${year}/${month}`;

  return apiClient.callApiGet(url, null, null, null);
};

export const getStatisOfYearOfUserLogin = year => {
  const url = `${BASE_URL}/api/v1/statistic-of-year/${year}`;

  return apiClient.callApiGet(url, null, null, null);
};
