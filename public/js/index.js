import formValidator from "./formValidator.js";
const fv = new formValidator("#form");

// name validation
fv.register("#姓名", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "姓名不能为空哦！",
    };
  } else if (value.length > 10) {
    return {
      pass: false,
      error: "名字太长啦！",
    };
  }
  return {
    pass: true,
  };
});

// phone validation
fv.register("#手机", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "手机号不能为空哦！",
    };
  } else if (value.length != 11) {
    return {
      pass: false,
      error: "手机号长度错误！",
    };
  }
  return {
    pass: true,
  };
});

// QQ validation
fv.register("#QQ", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "QQ号不能为空哦！",
    };
  } else if (value.length > 11 || value.length < 5) {
    return {
      pass: false,
      error: "QQ号长度错误！",
    };
  }
  return {
    pass: true,
  };
});

// email validation
fv.register("#邮箱", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "邮箱不能为空哦！",
    };
  } else if (!value.includes("@")) {
    return {
      pass: false,
      error: "邮箱格式错误",
    };
  } else if (value.length > 30) {
    return {
      pass: false,
      error: "邮箱太长啦！",
    };
  }
  return {
    pass: true,
  };
});

// id validation
fv.register("#学号", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "学号不能为空哦！",
    };
  } else if (value.length != 12) {
    return {
      pass: false,
      error: "学号长度错误！",
    };
  }
  return {
    pass: true,
  };
});

// academy validation
fv.register("#学院", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "学院不能为空哦！",
    };
  } else if (value.length > 30) {
    return {
      pass: false,
      error: "学院名字太长啦！",
    };
  }
  return {
    pass: true,
  };
});

// profession validation
fv.register("#专业", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "专业不能为空哦！",
    };
  } else if (value.length > 30) {
    return {
      pass: false,
      error: "专业名字太长啦！",
    };
  }
  return {
    pass: true,
  };
});

// introduce validation
fv.register("#自我介绍", (value, inputField) => {
  if (value.length === 0) {
    return {
      pass: false,
      error: "自我介绍不能为空哦！",
    };
  } else if (value.length < 4) {
    return {
      pass: false,
      error: "字数太少啦，至少4个字哦！",
    };
  } else if (value.length > 500) {
    return {
      pass: false,
      error: "自我介绍太长啦！",
    };
  }
  return {
    pass: true,
  };
});

// 第一志愿
fv.registerForSelects();

window.fv = fv;
