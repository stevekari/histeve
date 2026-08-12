import { useEffect, useState } from 'react'
import dataApi from '../api/dataApi'
import './Message.css'

export default function Message() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [removingIds, setRemovingIds] = useState([]);

    const loadMessages = async () => {
        try {
            setError('');
            const data = await dataApi.getMessages();
            setMessages(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Unable to load messages');
        }
    };

    useEffect(() => {
      let isMounted = true;

      dataApi
        .getMessages()
        .then((data) => {
          if (!isMounted) {
            return;
          }
          setMessages(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          if (!isMounted) {
            return;
          }
          setError(err.message || 'Unable to load messages');
        })
        .finally(() => {
          if (!isMounted) {
            return;
          }
          setLoading(false);
        });

      return () => {
        isMounted = false;
      };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) {
            return;
        }

        try {
            setError('');
            await dataApi.createMessage(trimmed);
            setInputValue('');
          setLoading(true);
            await loadMessages();
          setLoading(false);
        } catch (err) {
            setError(err.message || 'Unable to create message');
          setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setError('');
        setRemovingIds((prev) => [...prev, id]);
        await new Promise((resolve) => setTimeout(resolve, 260));
            await dataApi.deleteMessage(id);
            await loadMessages();
        } catch (err) {
            setError(err.message || 'Unable to delete message');
        } finally {
        setRemovingIds((prev) => prev.filter((itemId) => itemId !== id));
        setLoading(false);
        }
    };

    const startEdit = (message) => {
      setEditingId(message.id);
      setEditValue(message.text || '');
    };

    const cancelEdit = () => {
      setEditingId(null);
      setEditValue('');
    };

    const saveEdit = async (id) => {
      const trimmed = editValue.trim();
      if (!trimmed) {
        setError('Message cannot be empty');
        return;
      }

      try {
        setError('');
        await dataApi.updateMessage(id, trimmed);
        await loadMessages();
        cancelEdit();
      } catch (err) {
        setError(err.message || 'Unable to edit message');
      }
    };

  return (
    <div className="message-shell">
        <h2 className="message-title">Messages</h2>

        <form className="message-form" onSubmit={handleSubmit}>
        <div className="field-wrap">
          <label className="message-label" htmlFor="message">Message</label>
          <input
            className="message-input"
            type="text"
            name="message"
            id="message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
          />
        </div>
        <div className="field-actions">
          <button className="btn btn-primary" type="submit">Send</button>
        </div>
      </form>

      {loading && <p className="status">Loading messages...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <ul className="message-list">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`message-item ${removingIds.includes(message.id) ? 'is-removing' : ''} ${editingId === message.id ? 'is-editing' : ''}`}
            >
              {editingId === message.id ? (
                <div className="edit-row">
                  <input
                    className="edit-input"
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className="item-actions">
                    <button className="btn btn-save" type="button" onClick={() => saveEdit(message.id)}>
                      Save
                    </button>
                    <button className="btn btn-ghost" type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="message-text">{message.text}</span>
                  <div className="item-actions">
                    <button className="btn btn-edit" type="button" onClick={() => startEdit(message)}>
                      Edit
                    </button>
                    <button className="btn btn-delete" type="button" onClick={() => handleDelete(message.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
