let currentPage = "events-list";

document.body.addEventListener('click', event => {
  if (event.target && event.target.matches(".details-link")) {
    pageRouter();
  }
});

document.body.addEventListener('click', event => {
  if (event.target && event.target.matches("[data-event-status]")) {
    applyToEvent(event.target);
  }
});

function pageRouter() {
  if (currentPage==="events-list") {
      document.querySelector("#events-list").style.display = 'none';
      document.querySelector("#event-details").style.display = 'block';
      window.scrollTo(0, 0);
      currentPage = "event-details";
  } else if (currentPage === "event-details") {
      document.querySelector("#events-list").style.display = 'block';
      document.querySelector("#event-details").style.display = 'none';
      window.scrollTo(0, 0);
      currentPage = "events-list";
  }
}

function applyToEvent(e) {
  openModal();
}

function openModal() {
  const modal = document.querySelector(".modal");

  if (!modal.classList.contains("active")) {
    modal.classList.add("active");
  }
  closeModal(modal);
}

function closeModal(modal) {
  modal.addEventListener('click', event => {
    modal.classList.remove("active");
  });
}



