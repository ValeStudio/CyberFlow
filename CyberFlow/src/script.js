// Dati simulati
let mockUsers = [
  {
    id: 1,
    name: "Mario Rossi",
    role: "Project Manager",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Laura Bianchi",
    role: "Marketing Director",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Giovanni Verdi",
    role: "IT Specialist",
    avatar: "https://via.placeholder.com/50",
  },
];

let mockMessages = [
  {
    id: 1,
    from: "Mario Rossi",
    text: "Riunione di progetto alle 15:00",
    time: "Ora",
  },
  {
    id: 2,
    from: "Laura Bianchi",
    text: "Report marketing completato",
    time: "30m fa",
  },
];

let mockEvents = [
  {
    id: 1,
    title: "Formazione IA",
    date: "30 Nov",
    time: "10:00",
    location: "Sala Riunioni 2",
  },
  {
    id: 2,
    title: "Riunione Strategica",
    date: "5 Dec",
    time: "14:30",
    location: "Zoom",
  },
  {
    id: 3,
    title: "Demo Prodotto",
    date: "12 Dec",
    time: "11:00",
    location: "Sala Conferenze",
  },
];

// Funzione per caricare una sezione
function loadSection(section) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  if (section === "home") {
    content.innerHTML = `
      <h2>Dashboard</h2>
      <div class="card">
        <h3>Team</h3>
        ${mockUsers
          .map(
            (user) => `
            <div>
              <img src="${user.avatar}" alt="${user.name}" class="avatar">
              <strong>${user.name}</strong> - ${user.role}
            </div>
          `
          )
          .join("")}
      </div>
    `;
  } else if (section === "calendar") {
    content.innerHTML = `
      <h2>Calendario</h2>
      <input type="text" id="filterInput" placeholder="Cerca per evento o data" onkeyup="filterEvents()">
      <div class="card">
        ${mockEvents
          .map(
            (event) => `
            <div class="event" data-id="${event.id}">
              <strong>${event.title}</strong><br>
              <em>${event.date} - ${event.time}</em><br>
              Luogo: ${event.location}
              <button class="deleteEvent">Elimina</button>
            </div>
          `
          )
          .join("")}
      </div>
      <h3>Aggiungi Evento</h3>
      <form id="addEventForm">
        <input type="text" id="eventName" placeholder="Nome evento" required>
        <input type="date" id="eventDate" required>
        <input type="time" id="eventTime" required>
        <button type="submit">Aggiungi Evento</button>
      </form>
    `;
    document.getElementById("addEventForm").addEventListener("submit", (e) => {
      e.preventDefault();
      addEvent();
    });

    // Add event listener to delete buttons
    const deleteButtons = document.querySelectorAll(".deleteEvent");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const eventId = e.target.closest(".event").getAttribute("data-id");
        deleteEvent(parseInt(eventId));
      });
    });
  } else if (section === "messages") {
    content.innerHTML = `
      <h2>Chat</h2>
      <div class="chat-box">
        <div class="chat-messages">
          ${mockMessages
            .map(
              (msg) => `
              <div class="chat-message">
                <strong>${msg.from}:</strong> ${msg.text} <span class="time">${msg.time}</span>
              </div>
            `
            )
            .join("")}
        </div>
        <div class="chat-input">
          <input type="text" id="chatInput" placeholder="Scrivi un messaggio...">
          <button id="sendMessage">Invia</button>
        </div>
      </div>
    `;
    document.getElementById("sendMessage").addEventListener("click", () => {
      const chatInput = document.getElementById("chatInput");
      const message = chatInput.value;
      if (message.trim()) {
        const newMessage = {
          id: mockMessages.length + 1,
          from: "Tu",
          text: message,
          time: new Date().toLocaleTimeString(),
        };
        mockMessages.push(newMessage);
        loadSection("messages");
      }
    });
  } else if (section === "team") {
    content.innerHTML = `
      <h2>Team</h2>
      <div class="team-list">
        ${mockUsers
          .map(
            (user) => `
            <div class="team-member">
              <img src="${user.avatar}" alt="${user.name}" class="avatar">
              <div>
                <strong>${user.name}</strong><br>
                <span>${user.role}</span>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
      <button onclick="addTeamMember()">Aggiungi Membro</button>
    `;
  } else if (section === "settings") {
    content.innerHTML = `
      <h2>Impostazioni</h2>
      <div class="card">
        <h3>Profilo Utente</h3>
        <label for="theme">Tema Dark</label>
        <input type="checkbox" id="theme" onchange="toggleTheme()">
      </div>
    `;
  }
}

// Funzione per rimuovere un evento
function deleteEvent(id) {
  mockEvents = mockEvents.filter((event) => event.id !== id);
  loadSection("calendar");
}

// Funzione per aggiungere un evento
function addEvent() {
  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventTime = document.getElementById("eventTime").value;
  const newEvent = {
    id: mockEvents.length + 1,
    title: eventName,
    date: eventDate,
    time: eventTime,
    location: "Sala",
  };
  mockEvents.push(newEvent);
  loadSection("calendar");
}

// Funzione per filtrare gli eventi
function filterEvents() {
  const filterText = document.getElementById("filterInput").value.toLowerCase();
  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(filterText) ||
      event.date.includes(filterText)
  );
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Calendario</h2>
    <div class="card">
      ${filteredEvents
        .map(
          (event) => `
          <div class="event">
            <strong>${event.title}</strong><br>
            <em>${event.date} - ${event.time}</em><br>
            Luogo: ${event.location}
            <button class="deleteEvent" onclick="deleteEvent(${event.id})">Elimina</button>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

// Funzione per aggiungere un membro al team
function addTeamMember() {
  const newUser = {
    id: mockUsers.length + 1,
    name: "Nuovo Membro",
    role: "Ruolo",
    avatar: "https://via.placeholder.com/50",
  };
  mockUsers.push(newUser);
  loadSection("team");
}

// Funzione per commutare la modalità dark
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Gestione dei clic nel menu
document.querySelectorAll(".menu-item").forEach((button) => {
  button.addEventListener("click", (event) => {
    const section = event.target.getAttribute("data-section");
    loadSection(section);
  });
});

// Function to toggle dark mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// Check if dark mode is enabled on page load
const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
}

// Event listener for the

const themeToggle = document.getElementById("theme");
themeToggle.addEventListener("change", toggleTheme);

// Carica la sezione predefinita al caricamento della pagina
loadSection("home");
