import moment from "moment";

export const parseDateTime = date => {
  if (date) {
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  }

  return null;
};

export const estimateDateTime = (startDate, estimateDay) => {
  if (startDate) {
    return moment(startDate)
      .add(estimateDay, "days")
      .format("YYYY-MM-DDTHH:mm:ss");
  }

  return null;
};

export const convertFrontEndDateTime = date => {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return "Chưa xác định";
};

export const convertFrontEndDateTime2 = date => {
  if (date) {
    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  return "Chưa xác định";
};

export const findNumberOfUsingDay = (startDate, endDate) => {
  if (!startDate) {
    return "Chưa xác định";
  }

  let tempStartDate = moment(startDate);
  let temp = endDate ? moment(endDate) : moment();

  var duration = moment.duration(temp.diff(tempStartDate));
  return parseInt(duration.asDays());
};
