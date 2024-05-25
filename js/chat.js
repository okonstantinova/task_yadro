document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('chat-btn');
    const qaBtn = document.getElementById('qa-btn');
    const chatContainer = document.getElementById('chat-container');
    const qaContainer = document.getElementById('qa-container');
    const chatMessages = document.querySelector('.chat-messages');
    const chatForm = document.querySelector('.chat-form');
    const chatInput = document.querySelector('#chat-input');
    const authorNameElement = document.getElementById('chat-author-name');
    const editAuthorButton = document.querySelector('.edit-author-button');
    const chatInputContainer = document.getElementById('chat-input-container');
    const showChatInputButton = document.getElementById('show-chat-input-button');
    const saveAuthorButton = document.querySelector('.save-author-button');
    const authorInput = document.getElementById('author-input');


    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    let author = localStorage.getItem('chatAuthor') || 'Аноним';
    authorNameElement.textContent = author;

    chatBtn.addEventListener('click', () => {
        chatContainer.style.display = 'block';
        qaContainer.style.display = 'none';
        chatBtn.classList.add('active');
        qaBtn.classList.remove('active');
    });

    qaBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        qaContainer.style.display = 'flex';
        chatBtn.classList.remove('active');
        qaBtn.classList.add('active');
    });

    showChatInputButton.addEventListener('click', () => {
        chatInputContainer.classList.remove('hidden');
        showChatInputButton.classList.add('hidden');
        chatMessages.classList.toggle('expanded');
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addMessage(author, chatInput.value);
        chatInput.value = '';
    });

    editAuthorButton.addEventListener('click', () => {
        if (editAuthorButton.textContent === 'Ред.') {
            authorInput.value = author;
            authorInput.style.display = 'inline';
            authorNameElement.style.display = 'none';
            editAuthorButton.style.display = 'none'; // Скрываем кнопку "Ред."
            saveAuthorButton.style.display = 'inline'; // Показываем кнопку "Сохранить"
            authorInput.focus();
        }
    });

    saveAuthorButton.addEventListener('click', () => {
        if (authorInput.value) {
            author = authorInput.value;
            authorNameElement.textContent = author;
            localStorage.setItem('chatAuthor', author);
        }
        authorInput.style.display = 'none';
        authorNameElement.style.display = 'inline';
        saveAuthorButton.style.display = 'none'; // Скрываем кнопку "Сохранить"
        editAuthorButton.style.display = 'inline'; // Показываем кнопку "Ред."
    });

    authorInput.addEventListener('input', () => {
        author = authorInput.value;
        console.log('Author input changed:', author);
    });

    authorInput.addEventListener('blur', () => {
        if (authorInput.value) {
            authorNameElement.textContent = author;
            localStorage.setItem('chatAuthor', author);
        }
        authorInput.style.display = 'none';
        authorNameElement.style.display = 'inline';
        saveAuthorButton.style.display = 'none'; // Скрываем кнопку "Сохранить"
        editAuthorButton.style.display = 'inline'; // Показываем кнопку "Ред."
    });

    function addMessage(author, text) {
        // в реальности, здесь нужно обратиться к API для создания нового сообщения
        const message = {
            author,
            text,
            likes: 0,
            liked: false
        };
        messages.push(message);
        saveMessages();
        displayMessages();
    }

    function displayMessages() {
        chatMessages.innerHTML = '';
        messages.forEach((message) => {
            const messageElement = document.createElement('li');
            messageElement.classList.add('chat-message');

            const authorElement = document.createElement('p');
            authorElement.classList.add('chat-message-author');
            authorElement.textContent = message.author;

            const textElement = document.createElement('p');
            textElement.textContent = message.text;

            const likeContainer = document.createElement('div');
            likeContainer.classList.add('like-container');

            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.innerHTML = `<img src="../img/like.svg" alt="like">`;

            const likeCount = document.createElement('span');
            likeCount.classList.add('like-count');
            likeCount.textContent = message.likes;

            if (message.liked) {
                likeButton.classList.add('liked');
                likeButton.innerHTML = `<img src="../img/hover.svg" alt="like">`;
            }

            likeButton.addEventListener('click', () => {
                if (!likeButton.classList.contains('liked')) {
                    message.likes += 1;
                    message.liked = true;
                    likeButton.innerHTML = `<img src="../img/hover.svg" alt="like">`;
                } else {
                    message.likes -= 1;
                    message.liked = false;
                    likeButton.innerHTML = `<img src="../img/like.svg" alt="like">`;
                }
                likeCount.textContent = message.likes;
                likeButton.classList.toggle('liked');
                saveMessages();
            });

            likeContainer.appendChild(likeButton);
            likeContainer.appendChild(likeCount);

            messageElement.appendChild(authorElement);
            messageElement.appendChild(textElement);
            messageElement.appendChild(likeContainer);
            chatMessages.appendChild(messageElement);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function saveMessages() {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    displayMessages();
});
