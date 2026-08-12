
const BASE_URL = 'http://localhost:8080/api/messages';

const dataApi = {
    getMessages: async () => {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    },

    createMessage: async (text) => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Failed to create message');
        }

        return response.json();
    },

    updateMessage: async (id, text) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Failed to update message');
        }

        return response.json();
    },

    deleteMessage: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete message');
        }
    }
};

export default dataApi;