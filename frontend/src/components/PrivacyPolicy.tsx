import React from 'react';
import './Page.css'; // Assuming a generic page styling

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Política de Privacidad</h1>
      <p className="page-content">
        En Noti42, la privacidad de nuestros visitantes es de suma importancia para nosotros.
        Esta política de privacidad describe los tipos de información personal que se recopilan y cómo se utiliza.
      </p>
      <h2 className="page-subtitle">Información que Recopilamos</h2>
      <p className="page-content">
        Recopilamos información de varias maneras, incluyendo:
        <ul>
          <li>Información que usted nos proporciona directamente (por ejemplo, al suscribirse a nuestro boletín).</li>
          <li>Información recopilada automáticamente a través de cookies y tecnologías de seguimiento.</li>
        </ul>
      </p>
      <h2 className="page-subtitle">Uso de la Información</h2>
      <p className="page-content">
        La información recopilada se utiliza para:
        <ul>
          <li>Personalizar su experiencia en nuestro sitio.</li>
          <li>Mejorar nuestro sitio web y servicios.</li>
          <li>Enviar correos electrónicos periódicos si se ha suscrito.</li>
        </ul>
      </p>
      <h2 className="page-subtitle">Compartir Información</h2>
      <p className="page-content">
        No vendemos, intercambiamos ni transferimos de ninguna otra forma a terceros su información de identificación personal.
      </p>
      <h2 className="page-subtitle">Consentimiento</h2>
      <p className="page-content">
        Al utilizar nuestro sitio, usted acepta nuestra política de privacidad.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
