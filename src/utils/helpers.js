import moment from "moment";
import * as OrderStatus from "./../constants/OrderStatus";
import * as OrderType from "./../constants/OrderType";
import * as ProjectPhase from "./../constants/ProjectPhase";
import * as ProjectStatus from "./../constants/ProjectStatus";
import * as UserRole from "./../constants/UserRole";

export const getLocalToken = () => {
  let authObj = JSON.parse(localStorage.getItem("MB_AUTH"));

  if (!authObj) {
    return null;
  }

  let { expiredTime } = authObj;

  if (!expiredTime) {
    return null;
  }

  let tempTime = moment(expiredTime);

  if (tempTime > moment()) {
    return authObj;
  } else {
    return null;
  }
};

// eslint-disable-next-line require-yield
export const saveAuthToStorage = data => {
  let { token, duration } = data;

  let expiredTime = moment()
    .add(duration - 60, "s")
    .format("YYYY-MM-DDTHH:mm:ssZ");

  let authObj = {
    token,
    expiredTime
  };

  localStorage.setItem("MB_AUTH", JSON.stringify(authObj));
};

// TODO - remove
export const getToken = () => {
  let authObj = JSON.parse(localStorage.getItem("MB_AUTH"));

  return authObj;
};

export const getPhase = phase => {
  switch (phase) {
    case ProjectPhase.EXCHANGE:
      return "ĐANG TRAO ĐỔI VỚI KHÁCH HÀNG";
    case ProjectPhase.REQUEST_DESIGN:
      return "YÊU CẦU THIẾT KẾ";
    case ProjectPhase.DESIGN:
      return "ĐANG THIẾT KẾ 3D";
    case ProjectPhase.REQUEST_PRODUCTION:
      return "YÊU CẦU SẢN XUẤT";
    case ProjectPhase.PRODUCTION:
      return "ĐANG SẢN XUẤT";
    case ProjectPhase.CANCEL:
      return "ĐÃ BỊ HỦY";
    case ProjectPhase.DONE:
      return "ĐÃ HOÀN THÀNH";
    default:
      return "KHÔNG XÁC ĐỊNH";
  }
};

export const getStatus = status => {
  switch (status) {
    case ProjectStatus.UN_CONFIRM:
      return "CHƯA XÁC NHẬN CÔNG VIỆC";
    case ProjectStatus.CONFIRM:
      return "ĐÃ XÁC NHẬN CÔNG VIỆC";
    case ProjectStatus.IN_PROGRESS:
      return "ĐANG LÀM VIỆC";
    case ProjectStatus.RESOLVE:
      return "ĐÃ LÀM XONG";
    default:
      return "KHÔNG XÁC ĐỊNH";
  }
};

export const getUserRole = role => {
  switch (role) {
    case UserRole.CLIENT:
      return "KHÁCH HÀNG";
    case UserRole.DESIGN:
      return "THIẾT KẾ";
    case UserRole.DESIGN_LEADER:
      return "THIẾT KẾ TRƯỞNG";
    case UserRole.SALE:
      return "NHÂN VIÊN BÁN HÀNG";
    case UserRole.PRODUCER:
      return "THỢ MỘC";
    case UserRole.PRODUCER_LEADER:
      return "THỢ CẢ";
    case UserRole.MANAGER:
      return "AE";
    default:
      return "KHÔNG XÁC ĐỊNH";
  }
};

export const getOrderType = type => {
  switch (type) {
    case OrderType.DESIGN:
      return "ĐƠN HÀNG THIẾT KẾ";
    case OrderType.PRODUCTION:
      return "ĐƠN HÀNG SẢN XUẤT";
    default:
      return "KHÔNG XÁC ĐỊNH";
  }
};

export const getOrderStatus = status => {
  switch (status) {
    case OrderStatus.NOT_VALIDATE:
      return "CHUYỂN TỚI KẾ TOÁN";
    case OrderStatus.VALIDATE_FALSE:
      return "XÁC THỰC - FALSE";
    case OrderStatus.VALIDATE_TRUE:
      return "CHUYỂN TỚI KỸ THUẬT";
    case OrderStatus.IN_PROGRESS:
      return "ĐANG LÀM";
    case OrderStatus.DONE:
      return "HOÀN THÀNH";
    default:
      return "KHÔNG XÁC ĐỊNH";
  }
};

export const getStatusColor = status => {
  switch (status) {
    case OrderStatus.NOT_VALIDATE:
      return "#546e7a";
    case OrderStatus.VALIDATE_FALSE:
      return "red";
    case OrderStatus.VALIDATE_TRUE:
      return "#f57f17";
    case OrderStatus.IN_PROGRESS:
      return "#0277bd";
    case OrderStatus.DONE:
      return "green";
    default:
      return "black";
  }
};

const formatterCurrency = new Intl.NumberFormat("vi-VI", {
  style: "currency",
  currency: "VND"
});

export const getCurrency = amount => {
  if (!amount) return 0;

  return formatterCurrency.format(amount);
};

export const getCurrencyValue = amount => {
  if (!amount) return "Không xác định";

  const cleanedInput = amount.replace(/\./g, "");

  return parseInt(cleanedInput);
};

export const generateId = () => {
  return new Date().getTime();
};

export const hasPermission = (role, arrayRole) => {
  let hasPermission = false;

  arrayRole.forEach(e => {
    if (role === e) {
      hasPermission = true;
    }
  });

  return hasPermission;
};

export const getClientId = () => {
  return `MKH_${new Date().getTime()}`;
};
