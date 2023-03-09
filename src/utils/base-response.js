function generateBaseResponse(data, err) {
  if (err == null) {
    return {
      success: true,
      message: null,
      data,
    };
  }
  return {
    success: false,
    message: err,
    data: null,
  };
}

export default generateBaseResponse;
