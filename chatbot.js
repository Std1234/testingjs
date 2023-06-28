// JavaScript Chatbot Client
(function() {
    var chatWidget = document.createElement('div');
    chatWidget.id = 'myChatbot';
    chatWidget.style.position = 'fixed';
    chatWidget.style.bottom = '0';
    chatWidget.style.right = '0';
    chatWidget.style.width = '300px';
    chatWidget.style.height = '400px';
    chatWidget.style.backgroundColor = '#fff';
    chatWidget.style.border = '1px solid #ccc';
    chatWidget.style.padding = '10px';
    chatWidget.style.overflow = 'auto';
    chatWidget.style.display = 'none';

    var chatButton = document.createElement('button');
    chatButton.innerHTML = 'Chat with us';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '0';
    chatButton.style.right = '0';
    chatButton.onclick = function() {
        if (chatWidget.style.display === 'none') {
            chatWidget.style.display = 'block';
        } else {
            chatWidget.style.display = 'none';
        }
    };

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWidget);

    async function query(data) {
        const response = await fetch(
            "https://frontend-production-eb9a.up.railway.app/api/v1/prediction/8ae09b59-b273-42e8-bc4d-1991d70fb60a",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        return result;
    }

    chatWidget.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            var message = e.target.value;
            e.target.value = '';
            var messageElement = document.createElement('p');
            messageElement.textContent = 'You: ' + message;
            chatWidget.appendChild(messageElement);
            query({"question": message}).then((response) => {
                var replyElement = document.createElement('p');
                replyElement.textContent = 'Bot: ' + response.answer;
                chatWidget.appendChild(replyElement);
            });
        }
    });
})();