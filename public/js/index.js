class formValidator {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.inputsWithErrors = new Set();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.hasErrors) {
        this.form.submit();
      }
    });
  }

  get hasErrors() {
    return this.inputsWithErrors.size > 0;
  }

  register(selector, but_selector, check) {
    const inputField = this.form.querySelector(selector);
    const errorElement = inputField.closest(".form-element").querySelector(".err-msg");

    const execute = (hideErrors) => {
      const { pass, error } = check(inputField.value, inputField);
      if (!hideErrors) errorElement.textContent = error || "";
      if (pass) {
        this.inputsWithErrors.delete(inputField);
      } else {
        this.inputsWithErrors.add(inputField);
      }
    };
    inputField.addEventListener("change", () => execute());
    document.querySelector(but_selector).addEventListener("click", () => execute());
  }

  registerForSelects() {
    const select1 = document.getElementById("第一志愿");
    const select2 = document.getElementById("第二志愿");
    const errorElement1 = select1.closest(".form-element").querySelector(".err-msg");
    const errorElement2 = select2.closest(".form-element").querySelector(".err-msg");

    const execute = (hideErrors) => {
      if (select1.value === select2.value) {
        if (!hideErrors) {
          errorElement1.textContent = "志愿重复，请修改第一或第二志愿";
          errorElement2.textContent = "志愿重复，请修改第一或第二志愿";
        }
        this.inputsWithErrors.add(select1);
        this.inputsWithErrors.add(select2);
      } else {
        errorElement1.textContent = "";
        errorElement2.textContent = "";
        this.inputsWithErrors.delete(select1);
        this.inputsWithErrors.delete(select2);
      }
    };
    select1.addEventListener("change", () => execute());
    select2.addEventListener("change", () => execute());
    document.querySelector('button[type="submit"]').addEventListener("click", () => execute());
  }
}

const fv = new formValidator("#form");

// name validation
fv.register("#姓名", "#step1-next-but", (value, inputField) => {
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
fv.register("#手机", "#step2-next-but", (value, inputField) => {
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
fv.register("#QQ", "#step2-next-but", (value, inputField) => {
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
fv.register("#邮箱", "#step2-next-but", (value, inputField) => {
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
fv.register("#学号", "#step3-next-but", (value, inputField) => {
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
fv.register("#学院", "#step3-next-but", (value, inputField) => {
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
fv.register("#专业", "#step3-next-but", (value, inputField) => {
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
fv.register("#自我介绍", "button[type='submit']", (value, inputField) => {
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

// 第一和第二志愿
fv.registerForSelects();

function showStep(setp) {
  const steps = document.getElementsByClassName("steps");
  for (var i = 0; i < steps.length; i++) {
    if (i !== setp) steps[i].style.display = "none";
    else steps[i].style.display = "";
  }
}

function isNextStepValid(step) {
  const stepInputs = [];
  stepInputs.push([document.querySelector("#姓名")]);
  stepInputs.push([document.querySelector("#手机"), document.querySelector("#QQ"), document.querySelector("#邮箱")]);
  stepInputs.push([document.querySelector("#学号"), document.querySelector("#学院"), document.querySelector("#专业")]);
  console.log(fv.inputsWithErrors, stepInputs[step]);
  for (var i = 0; i < stepInputs[step].length; i++) {
    if (fv.inputsWithErrors.has(stepInputs[step][i])) return false;
  }
  return true;
}

document.querySelector("#step1-next-but").addEventListener("click", () => {
  if (isNextStepValid(0)) showStep(1);
});

document.querySelector("#step2-pre-but").addEventListener("click", () => showStep(0));
document.querySelector("#step2-next-but").addEventListener("click", () => {
  if (isNextStepValid(1)) showStep(2);
});

document.querySelector("#step3-pre-but").addEventListener("click", () => showStep(1));
document.querySelector("#step3-next-but").addEventListener("click", () => {
  if (isNextStepValid(2)) showStep(3);
});

document.querySelector("#step4-pre-but").addEventListener("click", () => showStep(2));

showStep(0);
