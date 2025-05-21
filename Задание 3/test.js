const ws = new WebSocket('wss://echo-ws-service.herokuapp.com');

const chat = document.getElementById('chat');
const sendBtn = document.getElementById('sendBtn');
const geoBtn = document.getElementById('geoBtn');
const messageInput = document.getElementById('messageInput');

function appendMessage(text, className = 'server') {
  const msg = document.createElement('div');
  msg.className = `message ${className}`;
  msg.innerHTML = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  ws.send(text);
  messageInput.value = '';
});

ws.onmessage = (event) => {
  appendMessage(event.data, 'server');
};

geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    appendMessage('Геолокация не поддерживается', 'server');
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const message = `<a href="${mapLink}" target="_blank" class="geo-link">Гео-локация</a>`;
    appendMessage(message, 'user');
    ws.send(`Гео: ${latitude}, ${longitude}`);
  }, () => {
    appendMessage('Не удалось получить местоположение', 'server');
  });
});