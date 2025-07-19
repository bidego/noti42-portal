import React, { useState } from 'react';
import { submitPortalMessage } from '../api';
import './Form.css'; // Assuming a generic form styling

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage(null);

    try {
      const data = await submitPortalMessage(formData);

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Mensaje enviado con éxito!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al enviar el mensaje.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de red o del servidor.');
      console.error('Error al enviar el formulario de contacto:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Contáctanos</h1>
      <p className="form-description">Envíanos un mensaje y nos pondremos en contacto contigo lo antes posible.</p>
      <form onSubmit={handleSubmit} className="main-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="form-button" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
        {status === 'success' && <p className="form-success-message">{message}</p>}
        {status === 'error' && <p className="form-error-message">{message}</p>}
      </form>
    </div>
  );
};

export default ContactForm;