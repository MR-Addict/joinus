class formValidator {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.inputsWithErrors = new Set();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.hasErrors) {
        this.form.submit();
      } else {
        this.scrollToFirstError();
      }
    });
  }

  get hasErrors() {
    return this.inputsWithErrors.size > 0;
  }

  scrollToFirstError() {
    const offset = [];
    this.inputsWithErrors.forEach((prop) => {
      offset.push(prop.offsetTop);
    });
    document.body.scrollTop = Math.min(...offset) - 30; // For Safari
    document.documentElement.scrollTop = Math.min(...offset) - 30; // For Chrome, Firefox, IE and Opera
  }

  register(selector, check) {
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
    document.querySelector('button[type="submit"]').addEventListener("click", () => execute());
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
