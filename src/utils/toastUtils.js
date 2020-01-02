import { toast } from "react-toastify";

export const toastSuccess = message => {
  if (!message) {
    return;
  }

  toast.success(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const toastError = message => {
  if (!message) {
    return;
  }

  toast.error(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const toastWarning = message => {
  if (!message) {
    return;
  }

  toast.warn(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
