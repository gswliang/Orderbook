const numberFormat = (value) => {
  const stringValue = value.toString();
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default numberFormat;
