const numberFormat = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default numberFormat;
