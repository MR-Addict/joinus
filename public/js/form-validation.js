/* validaiotn listener */

// name input validation
const name_input = document.querySelector('input[name="姓名"]');
name_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("姓名不能为空哦！");
  }
});

name_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("姓名不能为空哦！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// phone input validation
const phone_input = document.querySelector('input[name="手机"]');
phone_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("手机号不能为空哦！");
  } else if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity("手机号长度错误！");
  }
});
phone_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("手机号不能为空哦！");
  } else if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity("手机号长度错误！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// qq input validation
const qq_input = document.querySelector('input[name="QQ"]');
qq_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("QQ号不能为空哦！");
  } else if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity("QQ号长度错误！");
  }
});
qq_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("QQ号不能为空哦！");
  } else if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity("QQ号长度错误！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// email input validation
const emial_input = document.querySelector('input[name="邮箱"]');
emial_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("邮箱不能为空哦！");
  } else if (event.target.validity.typeMismatch) {
    event.target.setCustomValidity("邮箱格式错误！");
  }
});
emial_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("邮箱不能为空哦！");
  } else if (event.target.validity.typeMismatch) {
    event.target.setCustomValidity("邮箱格式错误！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// id input validation
const id_input = document.querySelector('input[name="学号"]');
id_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("学号不能为空哦！");
  } else if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity("学号长度错误！");
  }
});
id_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("学号不能为空哦！");
  } else if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity("学号长度错误！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// academy input validation
const academy_input = document.querySelector('input[name="学院"]');
academy_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("学院不能为空哦！");
  }
});
academy_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("学院不能为空哦！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// academy input validation
const profession_input = document.querySelector('input[name="专业"]');
profession_input.addEventListener("invaid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("专业不能为空哦！");
  }
});
profession_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("专业不能为空哦！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

// academy input validation
const introduce_input = document.querySelector('textarea[name="自我介绍"]');
introduce_input.addEventListener("invalid", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("说点什么吧！");
  }
});
introduce_input.addEventListener("input", function (event) {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("说点什么吧！");
  } else {
    event.target.setCustomValidity("");
  }
  event.target.reportValidity();
});

/* validation */
// function validateForm() {
//   // prevernt submit

//   if (document.getElementById("手机").value.length != 11) {
//     document.getElementById("手机").setCustomValidity("手机号码格式错误！");
//     document.getElementById("手机").reportValidity();
//     return false;
//   }
//   if (document.getElementById("学号").value.length != 12) {
//     document.getElementById("学号").setCustomValidity("学号格式错误！");
//     return false;
//   }
//   console.log(document.getElementById("第一志愿").value);
//   console.log(document.getElementById("第二志愿").value);
//   if (document.getElementById("第一志愿").value == document.getElementById("第二志愿").value) {
//     document.getElementById("第一志愿").setCustomValidity("请修改第一或第二志愿！");
//     return false;
//   }
// }
