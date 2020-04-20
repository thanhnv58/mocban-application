import { sale_ClientScreenSagas } from "./client-screen-sagas";
import { sale_OrderScreenSagas } from "./order-screen-sagas";
import { sale_MainScreenSagas } from "./main-screen-sagas";

export const saleMainSagas = [
  ...sale_ClientScreenSagas,
  ...sale_OrderScreenSagas,
  ...sale_MainScreenSagas
];
