const isEmpty = data => {
  if (typeof data === "object") {
    return Object.keys(data).length === 0;
  }

  if (typeof data === "string") {
    return data.trim().length === 0;
  }
};

export default isEmpty;
