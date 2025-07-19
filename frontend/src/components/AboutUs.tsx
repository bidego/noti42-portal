import React from 'react';
import './Page.css'; // Assuming a generic page styling

const AboutUs: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Sobre Nosotros</h1>
      <p className="page-content">
        Noti42 es tu fuente confiable de noticias en tiempo real. Nos dedicamos a brindarte información precisa,
        relevante y actualizada sobre los acontecimientos más importantes a nivel local y global.
        Nuestro equipo de periodistas y editores trabaja incansablemente para cubrir una amplia gama de temas,
        desde política y economía hasta deportes, tecnología y cultura.
      </p>
      <p className="page-content">
        Creemos en el poder de la información para empoderar a las personas y fomentar una sociedad más informada y participativa.
        Nuestra misión es mantenerte al tanto de lo que sucede en el mundo, ofreciéndote análisis profundos y diversas perspectivas.
      </p>
      <p className="page-content">
        ¡Gracias por elegir Noti42 para mantenerte informado!
      </p>
    </div>
  );
};

export default AboutUs;
