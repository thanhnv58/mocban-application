import moment from "moment";
import * as OrderStatus from "./../constants/OrderStatus";
import * as OrderType from "./../constants/OrderType";
import * as ProjectPhase from "./../constants/ProjectPhase";
import * as ProjectStatus from "./../constants/ProjectStatus";
import * as UserRole from "./../constants/UserRole";
import * as NotificationType from "./../constants/NotificationType";
import * as TransactionType from "./../constants/TransactionType";
import * as TransactionOwner from "./../constants/TransactionOwner";

export const helpers_GetLocalToken = () => {
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
export const helpers_SaveAuthToStorage = data => {
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
      return "N/A";
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
      return "N/A";
  }
};

export const helpers_getUserRole = role => {
  switch (role) {
    case UserRole.ADMIN_SYSTEM:
      return "Nhân viên Hệ thống";
    case UserRole.DESIGN:
      return "Thiết kế";
    case UserRole.DESIGN_LEADER:
      return "Trưởng thiết kế";
    case UserRole.SALE:
      return "Nhân viên Bán hàng";
    case UserRole.PRODUCER:
      return "Thợ mộc";
    case UserRole.PRODUCER_LEADER:
      return "Trưởng thợ mộc";
    case UserRole.MANAGER:
      return "Quản lý";
    case UserRole.ACCOUNTANT:
      return "Kế toán";
    default:
      return "N/A";
  }
};

export const getOrderType = type => {
  switch (type) {
    case OrderType.DESIGN:
      return "ĐH - THIẾT KẾ";
    case OrderType.PRODUCTION:
      return "ĐH - SẢN XUẤT";
    default:
      return "N/A";
  }
};

export const getTransactionOwner = type => {
  switch (type) {
    case TransactionOwner.ALL:
      return "Tất cả";
    case TransactionOwner.CLIENT:
      return "Của khách hàng";
    case TransactionOwner.COMPANY:
      return "Của công ty";
    default:
      return "N/A";
  }
};

export const getOrderStatus = status => {
  switch (status) {
    case OrderStatus.NOT_VALIDATE:
      return "Tới Kế Toán";
    case OrderStatus.VALIDATE_TRUE:
      return "Tới kỹ thuật";
    case OrderStatus.IN_PROGRESS:
      return "Đang làm";
    case OrderStatus.DONE:
      return "Hoàn Thành";
    default:
      return "N/A";
  }
};

export const getStatusColor = status => {
  switch (status) {
    case OrderStatus.NOT_VALIDATE:
      return "#9e9e9e";
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

export const getTaskStatus = status => {
  switch (status) {
    case OrderStatus.VALIDATE_TRUE:
      return "Chưa làm";
    case OrderStatus.IN_PROGRESS:
      return "Đang làm";
    case OrderStatus.DONE:
      return "Hoàn Thành";
    default:
      return "N/A";
  }
};

export const getTaskColor = status => {
  switch (status) {
    case OrderStatus.VALIDATE_TRUE:
      return "#757575";
    case OrderStatus.IN_PROGRESS:
      return "#0277bd";
    case OrderStatus.DONE:
      return "green";
    default:
      return "black";
  }
};

export const getNotificationType = type => {
  switch (type) {
    case NotificationType.VALIDATE_ORDER:
      return "XÁC THỰC ĐƠN HÀNG";
    default:
      return "N/A";
  }
};

export const getTransactionType = type => {
  switch (type) {
    case TransactionType.INCOME:
      return "THU";
    case TransactionType.PAY:
      return "CHI";
    default:
      return "N/A";
  }
};

export const getTransactionTypeColor = type => {
  switch (type) {
    case TransactionType.INCOME:
      return "green";
    case TransactionType.PAY:
      return "red";
    default:
      return "black";
  }
};

export const getTransactionOwnerColor = type => {
  switch (type) {
    case TransactionOwner.CLIENT:
      return "green";
    case TransactionOwner.COMPANY:
      return "blue";
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
  if (!amount) return "N/A";

  const cleanedInput = amount.replace(/\./g, "");

  return parseInt(cleanedInput);
};

export const generateId = () => {
  return new Date().getTime();
};

export const helpers_hasPermission = (role, arrayRole) => {
  if (!arrayRole || arrayRole.length === 0) return false;

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
