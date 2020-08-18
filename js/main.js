let currentPage = "events-list";

let MOCK_USER = {
  name: "Maria Paz Muñoz",
  appliedEvents: [
    "women-mission-2020",
  ]
};

const MOCK_EVENTS = [
  {
    key: "ruth-hired-canada",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/06da3742-d896-4573-87f9-9fccb92f341a.jpg",
    type: "Meetup",
    date: "Sat, August 22",
    location: "Montreal, Canada",
    deadline: "August 20th"
  },
  {
    key: "women-mission-2020",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-1.png",
    type: "Meetup",
    date: "Sat, August 22",
    location: "Montreal, Canada",
    deadline: "August 20th"
  },
  {
    key: "meetup-tech-interview",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-2.png",
    type: "Premium Webinar",
    date: "Sat, August 22",
    location: "Montreal, Canada",
    deadline: "August 20th"
  },
  {
    key: "interview-practice-august",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-1.png",
    type: "Open Webinar",
    date: "Sat, August 22",
    location: "Montreal, Canada",
    deadline: "August 20th"
  },
  {
    key: "pablo-senior-dev",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-3.png",
    type: "Premium Webinar",
    date: "Sat, August 22",
    location: "ONLINE",
    deadline: "August 20th"
  },
  {
    key: "stefa-hired-vancouver",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/7e38624b-ba79-4e1d-9817-d4209edbb685.jpg",
    type: "Premium Webinar",
    date: "Sat, August 22",
    location: "ONLINE",
    deadline: "August 20th"
  },
];

document.body.addEventListener('click', e => {
  if (e.target && e.target.matches(".details-link")) {
    pageRouter();
  }
});

document.body.addEventListener('click', e => {
  if (e.target && e.target.matches("[data-event-status]")) {
    applyToEvent(e.target.closest(".event"));
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

function applyToEvent(eventNode) {
  const currentEventKey = getEventKey(eventNode);
  const cta = eventNode.querySelector(".primary-button");
  if (hasApplied(currentEventKey)) {
    return;
  }
  MOCK_USER.appliedEvents.push(currentEventKey);
  cta.classList.add("primary-button--checked");
  cta.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>Applied';
  openModal();
  console.log(MOCK_USER.appliedEvents);
}

function getEventKey(eventNode) {
  return eventNode.dataset.key;
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

function populateRegularEvents() {
  const eventsList = document.querySelector(".regular-events .main-container");

  MOCK_EVENTS.forEach(event => {
    const eventNode = document.createElement("div");
    eventNode.classList.add("event");
    eventNode.setAttribute("data-key", event.key);

    eventsList.appendChild(eventNode);
    eventNode.innerHTML = '<div class="event__media">' +
      '              <img class="details-link" src='+event.media+'>\n' +
      '            </div>\n' +
      '            <div class="event__info">\n' +
      '              <span class="event__type">'+event.type+'</span>\n' +
      '\n' +
      '              <span class="event__date">'+event.date+'</span>\n' +
      '              <h4>'+event.title+'</h4>\n' +
      '              <span class="event__location"><i class="fas fa-map-marker-alt"></i>'+event.location+'</span>\n' +
      '\n' +
      '              <div class="event__options">\n' +
      '                <span class="event__deadline"><b>Deadline: </b>'+event.deadline+'</span>\n' +
      '                <button class="primary-button" data-event-status="available"><span>Apply</span></button>\n' +
      '              </div>\n' +
      '              </div>';

    if (isPremiumEvent(event)) {
      eventNode.querySelector(".event__type").classList.add("event__type--premium");
    }

    if (hasApplied(event)) {
      eventNode.querySelector(".primary-button").classList.add("primary-button--checked");
    }
  });
}

function isPremiumEvent(event) {
  if(event.type === "Premium Webinar") {
    return true;
  }
}

function hasApplied(event) {
  if(MOCK_USER.appliedEvents.indexOf(event) > -1) {
    return true;
  }
}

populateRegularEvents();


