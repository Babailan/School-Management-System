const deepLowerCase = (obj: any) => {
  if (typeof obj !== "object") {
    return obj.toLowerCase();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepLowerCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === "string") {
      acc[key] = value.toLowerCase();
    } else if (typeof value === "object" && value !== null) {
      acc[key] = deepLowerCase(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export { deepLowerCase };
