const normalizeCurrency = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");

  const formatterCurrency = new Intl.NumberFormat("vi-VI");

  return formatterCurrency.format(onlyNums);
};

export default normalizeCurrency;
