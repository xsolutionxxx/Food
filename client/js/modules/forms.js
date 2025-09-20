function forms() {
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Thank you! We will definitely contact you.",
    failure: "Somthing went wrong.",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");

      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 15px auto 0;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest();
      // request.open("POST", "http://localhost:3000/submit");

      //request.setRequestHeader("Content-type", "application/json");
      // request.setRequestHeader("Content-type", "multipart/form-data"); встановлювати не треба у зв`язці з FormData і XMLHttpRequest() - не прийдут дані на сервер!
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      /* const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      }); */

      // const json = JSON.stringify(object);

      // request.send(json);

      /* postData("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        //body: formData,
        body: JSON.stringify(object),
      }) */

      try {
        const data = await postData("http://localhost:3000/requests", json);
        console.log(data);
        showThanksModal(message.success);
      } catch (err) {
        showThanksModal(message.failure);
      } finally {
        statusMessage.remove();
        form.reset();
      }

      /* postData("http://localhost:3000/requests", json) //JSON.stringify(object)
        //.then((data) => data.text())
        .then((data) => {
          // data - те що вернулося з сервера
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        }); */

      /* request.send(formData); */

      /* request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
        }
      }); */
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");

    openModal();
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  /* fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res)); */
}

module.exports = forms;
