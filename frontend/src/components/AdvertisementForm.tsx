import React, { useState } from 'react';
import './Form.css'; // Assuming a generic form styling

const AdvertisementForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
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
      const response = await fetch('/api/advertisement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Solicitud de publicidad enviada con éxito!');
        setFormData({ companyName: '', contactPerson: '', email: '', phone: '', message: '' }); // Clear form
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al enviar la solicitud de publicidad.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de red o del servidor.');
      console.error('Error al enviar el formulario de publicidad:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Publicita con Nosotros</h1>
      <p className="form-description">¿Interesado en anunciar en Noti42? Completa el siguiente formulario y te contactaremos.</p>
      <form onSubmit={handleSubmit} className="main-form">
        <div className="form-group">
          <label htmlFor="companyName">Nombre de la Empresa:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Persona de Contacto:</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
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
          <label htmlFor="phone">Teléfono (opcional):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje / Detalles de la Campaña:</label>
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
          {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
        {status === 'success' && <p className="form-success-message">{message}</p>}
        {status === 'error' && <p className="form-error-message">{message}</p>}
      </form>
    </div>
  );
};

export default AdvertisementForm;
