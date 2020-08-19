let currentPage = "events-list";

let MOCK_USER = {
  name: "Maria Paz Muñoz",
  appliedEvents: ["women-mission-2020"],
  subscriptionType: "regular"
};

const MOCK_EVENTS = [
  {
    key: "ruth-hired-canada",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "<img class='details-link' src='https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/06da3742-d896-4573-87f9-9fccb92f341a.jpg'>",
    type: "Premium Webinar",
    date: "Sat, August 22 // 2020",
    location: "Vancouver, Canada",
    deadline: "August 10th"
  },
  {
    key: "women-mission-2020",
    title: "Virtual Hiring Event for Women. Canada and Europe 2020",
    media: "<img class='details-link' src='https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-1.png'>",
    type: "Open Webinar",
    date: "Mon, September 21 // 2020",
    location: "ONLINE",
    deadline: "August 9th"
  },
  {
    key: "interview-practice-august",
    title: "Interview-practice class OPEN HOUSE August",
    media: "<img class='details-link' src='https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-2.png'>",
    type: "Meetup",
    date: "Mon, August 10 // 2020",
    location: "ONLINE",
    deadline: "September 1st"
  },
  {
    key: "interview-practice-august",
    title: "How Ruth got hired and relocated to Canada. Success Cases of Vanhack.",
    media: "<img class='details-link' src='https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-1.png'>",
    type: "Open Webinar",
    date: "Sat, August 22 // 2020",
    location: "Montreal, Canada",
    deadline: "August 20th"
  },
  {
    key: "acing-code-interview",
    title: "Acing the Code Interview with Tam KBeili",
    media: "<img class='details-link' src='https://raw.githubusercontent.com/mariapazmp/events-page/master/img/event-3.png'>",
    type: "Premium Webinar",
    date: "Fri, August 7 // 2020",
    location: "Berlin, Germany",
    deadline: "August 20th"
  },
  {
    key: "career-front-dev",
    title: "A Successful Career As a Front-end Developer in Europe",
    media: "<img class='details-link' src='https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/7e38624b-ba79-4e1d-9817-d4209edbb685.jpg'>",
    type: "Meetup",
    date: "Sat, August 22 // 2020",
    location: "ONLINE",
    deadline: "August 20th"
  },
  {
    key: "colombia-recruiting-mission-2021",
    title: "<strong>Apply</strong> now to the Colombia Recruiting Mission.",
    media: '<iframe width=\"515\" height=\"290\" src=\"https://www.youtube.com/embed/oYI3qbb6eJs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>',
    description: "Get interview for top-tech companies from Canada and Europe and be ready to relocate. A weekend long hackathon and recruiting fair to find your company best match. If you are a senior talent do not hesitate on participate.",
    type: "Recruiting Mission",
    date: "Sat, August 22 // 2020",
    location: "Medellin, Colombia",
    deadline: "March 20th - 25th // 2021",
    attendees: 102,
  },
  {
    key: "leap-montreal-2021",
    title: "Vanhack <strong>Leap </strong>Montreal 2021 is on the way.",
    media: "<img class='details-link' src='https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/06da3742-d896-4573-87f9-9fccb92f341a.jpg'>",
    description: "Get interview for top-tech companies from Canada and Europe and be ready to relocate. A weekend long hackathon and recruiting fair to find your company best match. If you are a senior talent do not hesitate on participate.",
    type: "Leap",
    date: "Sat, January 14 // 2021",
    location: "Vancouver, Canada",
    deadline: "December 20th",
    attendees: 323,
  },
  {
    key: "colombia-vanhackathon-2020",
    title: "Start your engines for the Online Vanhackathon",
    media: "<img class='details-link' src='https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/06da3742-d896-4573-87f9-9fccb92f341a.jpg'>",
    description: "Get interview for top-tech companies from Canada and Europe and be ready to relocate. A weekend long hackathon and recruiting fair to find your company best match. If you are a senior talent do not hesitate on participate.",
    type: "Vanhackathon",
    date: "Sat, August 22 // 2020",
    location: "Montreal, Canada",
    deadline: "August 20th",
    attendees: 78,
  },
];

populateEvents();
onApplyButtonClick();
onSeeDetailsClick();

function onApplyButtonClick() {
  document.body.addEventListener('click', e => {
    if (e.target && e.target.matches("button[data-event-status]")) {
        applyToEvent(e.target.closest(".event"));
    }
  });
}

function onSeeDetailsClick() {
  document.body.addEventListener('click', e => {
    if (e.target && e.target.matches(".details-link")) {
      const eventKey = getEventKey(e.target.closest(".event"));
      pageRouter(eventKey);
    }
  });
}

function pageRouter(eventKey) {
  if (currentPage ==="events-list") {
    setEventDetails(eventKey);
  } else if (currentPage === "event-details") {
    showEventsList();
  }
}

function populateEvents() {
  MOCK_EVENTS.forEach(event => {
    if( event.type.toLowerCase() === "leap" ||
      event.type.toLowerCase() === "recruiting mission" ||
      event.type.toLowerCase() === "vanhackathon") {
      createEventNode(event, "starred-events");
    } else {
      createEventNode(event,"regular-events");
    }
  });
}

function showEventsList() {
  document.querySelector("#events-list").style.display = 'block';
  document.querySelector("#event-details").style.display = 'none';
  window.scrollTo(0, 0);
  currentPage = "events-list";
}

function setEventDetails(eventKey) {
  const event = getEventObject(eventKey);

  document.querySelector("#event-details").setAttribute("data-key", event.key);
  document.querySelector("#event-details .breadcrumbs__item--current").innerHTML = event.title;
  document.querySelector(".event-details__title").innerHTML = event.title;
  document.querySelector(".event-details__featured-image").innerHTML = event.media;
  document.querySelector(".event-details__date").textContent = event.date;
  document.querySelector(".event-details__date span").textContent = event.date;
  document.querySelector(".event-details__event-type").textContent = event.type;
  document.querySelector(".event-details__location span").textContent = event.location;

  if (hasApplied(eventKey)) {
    disableButtons(document.querySelector("#event-details"));
  }

  showEventDetail();
  setSocialSharingLinks(event.title);
}

function showEventDetail() {
  document.querySelector("#events-list").style.display = 'none';
  document.querySelector("#event-details").style.display = 'block';
  window.scrollTo(0, 0);
  currentPage = "event-details";
}

function createEventNode(event, eventClassification) {
  const eventsListContainer = document.querySelector("."+eventClassification+" .main-container");

  const eventNode = document.createElement("div");
  eventNode.classList.add("event");
  eventNode.setAttribute("data-key", event.key);
  eventsListContainer.appendChild(eventNode);

  eventNode.innerHTML = '<div class="event__media">' +event.media+
    '            </div>\n' +
    '            <div class="event__info">\n' +
    '              <span class="event__type">'+event.type+'</span>\n' +
    '\n' +
    '              <span class="event__date">'+event.date+'</span>\n' +
    '              <h2 class="event__title">'+event.title+'</h2>\n' +
    '              <span class="event__description">'+event.description+'</span>\n'+
    '              <span class="event__location"><i class="fas fa-map-marker-alt"></i>'+event.location+'</span>\n' +
    '\n' +
    '              <div class="event__options">\n' +
    '                <span class="event__deadline"><b>Deadline: </b>'+event.deadline+'</span>\n' +
    '                <span class="event__attendees"><i class="fas fa-map-marker-alt"></i>'+event.attendees+' people attending</span>\n' +
    '                <button class="secondary-button details-link">Learn More</button>\n' +
    '                <button class="primary-button" data-event-status="available">Apply</button>\n' +
    '              </div>\n' +
    '              </div>';

  if (isPremiumEvent(event)) {
    eventNode.querySelector(".event__type").classList.add("event__type--premium");
  }

  if (hasApplied(event.key)) {
    disableButtons(eventNode);
  }
}

function applyToEvent(eventNode) {
  const currentEventKey = getEventKey(eventNode);
  const event = getEventObject(currentEventKey);
  if (event.type.toLowerCase() === "premium webinar" && MOCK_USER.subscriptionType.toLowerCase() !== "premium") {
    openModal("warning-modal");
  } else {
    if (hasApplied(currentEventKey)) {
      return;
    }
    MOCK_USER.appliedEvents.push(currentEventKey);
    setModalInfo(eventNode);
    disableButtons(eventNode);
  }
}

function disableButtons(eventNode) {
  const applyButtons = eventNode.querySelectorAll(".primary-button");

  applyButtons.forEach(function (button) {
    button.classList.add("primary-button--checked");
    button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>Applied';
    button.setAttribute("disabled", true);
  })
}

function hasApplied(eventKey) {
  if(MOCK_USER.appliedEvents.indexOf(eventKey) > -1) {
    return true;
  }
}

function isPremiumEvent(event) {
  if(event.type === "Premium Webinar") {
    return true;
  }
}

function getEventObject(eventKey) {
  return MOCK_EVENTS.find(element => element.key === eventKey);
}

function getEventKey(eventNode) {
  return eventNode.dataset.key;
}

function setModalInfo(eventNode) {
  const eventTitle = eventNode.querySelector(".event__title").innerText;
  document.querySelector(".confirmation-modal h3").innerText = eventTitle;
  setSocialSharingLinks(eventTitle);
  openModal("confirmation-modal");
}

function openModal(modalType) {
  const modal = document.querySelector("."+ modalType);

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

function socialWindow(url) {
  const left = (screen.width - 570) / 2;
  const top = (screen.height - 570) / 2;
  const params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
  window.open(url,"NewWindow",params);
}

function setSocialSharingLinks(linkDescription) {
  const pageUrl = encodeURIComponent("https://vanhack.com/platform/#/events");
  const tweet = encodeURIComponent("I just applied to "+linkDescription+" at Vanhack.com. Check more events!");

  document.querySelector(".sharing-link.twitter").addEventListener('click', e => {
    const url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + tweet;
    socialWindow(url);
  });

  document.querySelector(".sharing-link.facebook").addEventListener('click', e => {
    const url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
    socialWindow(url);
  });

  document.querySelector(".sharing-link.linkedin").addEventListener('click', e => {
    const url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
    socialWindow(url);
  });
}

