export default {
  getType(type) {
    let typeText = "";
    switch (type) {
      case "official":
        typeText = "官方";
        break;
      case "primary":
        typeText = "小学";
        break;
      case "juniorHight":
        typeText = "小学";
        break;
      case "high":
        typeText = "高中";
        break;
      case "university":
        typeText = "大学";
        break;
    }
    return typeText;
  }
};
