// HUNDLERS
/// 1. Open/closed modal window by click
export let modaleWindow = document.getElementById("modale");
export let container = document.querySelector(".container");
export let wrapperModal = document.querySelector(".block_wrapper");
export let textAreaElement = document.querySelector(".form_textarea");
export let titleElement = document.querySelector(".form_input");
export let userElement = document.getElementById("select_user");
export let timeElement = document.querySelector(".task_li_span_time");
export const confirmBtn = document.querySelector(".confirm-btn");
export const btnCancel = document.querySelector(".cancel-btn");
btnCancel.addEventListener("click", () => modalWindow.close());
export const modalWindow = {
  _confirmHandler: () => {},
  show(cb = () => {}, data = {}) {
    const { title, description, user, time } = data;
    container.classList.add("container_modal");
    wrapperModal.classList.add("block_wrapper_modal");
    modaleWindow.classList.remove("modal_window");
    textAreaElement.value = description || "";
    titleElement.value = title || "";
    userElement.options[userElement.selectedIndex].value = user || "";
    timeElement = time;
    this._confirmHandler = function() {
      const title = titleElement.value;
      const description = textAreaElement.value;
      const user = userElement.options[userElement.selectedIndex].value;
      const time = timeElement;
      const result = cb({ title, description, user, time });
      if (result && !result.isError) {
        this.close();
      }
    }.bind(modalWindow);
    confirmBtn.addEventListener("click", this._confirmHandler), { once: true };
  },
  close() {
    window.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode == 27) {
          modalWindow.close();
        }
      },
      { once: true }
    );
    confirmBtn.removeEventListener("click", this._confirmHandler);
    container.classList.remove("container_modal");
    wrapperModal.classList.remove("block_wrapper_modal");
    modaleWindow.classList.add("modal_window");
  }
};

