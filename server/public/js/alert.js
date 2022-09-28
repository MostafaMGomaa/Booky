export const showAlert = (type, icon, msg) => {
  return `
      <div class="container alert text-center position-absolute bottom-0 start-0 ms-2">
        <div class="row shadow-lg p-2 rounded bg-light position-relarive">
          <div class="col col-2 alert-icon ${type}-icon text-center rounded-circle pb-1 pt-2 ps-0 pe-0">
          <i class="${icon}"></i>
          </div>
          <div class="col alert-message text-center pt-2 text-dark">
            <h6>${msg}</h6>
          </div>
          <div class="col col-2 alert-close text-center p-0 ps-3 position-absolute top-0 end-0 mt-1 ms-1">
            <button
              class="btn-close btn-sm rounded-circle text-center p-1"
              type="button"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>`;
};
