// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBkKZoubsWgsSRnwWH4cSZiuVkRL2UxYzQ",
    authDomain: "halsokollenapi.firebaseapp.com",
    projectId: "halsokollenapi",
    storageBucket: "halsokollenapi.appspot.com",
    messagingSenderId: "12718191699",
    appId: "1:12718191699:web:a58f79322e52ba164f02a6",
    measurementId: "G-6HQDJCRKFT"
};
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function toggleChat() {
    const chatWidget = document.getElementById("chatWidget");
    chatWidget.classList.toggle("hidden");
    loadMessages(); // Load messages when chat is opened
}

function closeChat(event) {
    event.stopPropagation(); // Prevent closing the chat when clicking on the header
    const chatWidget = document.getElementById("chatWidget");
    chatWidget.classList.add("hidden");
}

function sendMessage() {
    const messageInput = document.getElementById("chatInput");
    const message = messageInput.value.trim();
    if (message) {
        const messagesRef = database.ref('messages');
        messagesRef.push({ text: message });
        messageInput.value = ""; // Clear input
    }
}

function loadMessages() {
    const messagesRef = database.ref('messages');
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = ""; // Clear existing messages
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        for (let id in messages) {
            const message = messages[id];
            const messageElement = document.createElement("div");
            messageElement.textContent = message.text;
            messagesContainer.appendChild(messageElement);
        }
        // Scroll to the bottom of the messages
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Call to load messages on page load
window.addEventListener('load', loadMessages);
