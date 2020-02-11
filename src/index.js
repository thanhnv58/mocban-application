import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myCreateStore from "./configs/configStore";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme/theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import format from "date-fns/format";

const rootElement = document.getElementById("root");
const store = myCreateStore();

class ViLocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, "dd MMM", { locale: this.locale });
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <MuiPickersUtilsProvider utils={ViLocalizedUtils} locale={viLocale}>
          <App />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  rootElement
);
serviceWorker.unregister();
