import React from 'react';
import './Page.css'; // Assuming a generic page styling

const TermsAndConditions: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Términos y Condiciones</h1>
      <p className="page-content">
        Bienvenido a Noti42. Al acceder y utilizar nuestro sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
        Si no está de acuerdo con alguna parte de estos términos y condiciones, por favor no utilice nuestro sitio web.
      </p>
      <h2 className="page-subtitle">Uso del Contenido</h2>
      <p className="page-content">
        Todo el contenido proporcionado en Noti42 es solo para fines informativos generales.
        No garantizamos la exactitud, integridad o utilidad de ninguna información en el sitio.
      </p>
      <h2 className="page-subtitle">Propiedad Intelectual</h2>
      <p className="page-content">
        El contenido, diseño, logotipos y otros materiales en este sitio web están protegidos por derechos de autor y otras leyes de propiedad intelectual.
        No puede reproducir, distribuir, modificar o utilizar el contenido sin nuestro permiso expreso por escrito.
      </p>
      <h2 className="page-subtitle">Enlaces a Otros Sitios Web</h2>
      <p className="page-content">
        Nuestro sitio web puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por Noti42.
        No tenemos control sobre el contenido, las políticas de privacidad o las prácticas de ningún sitio web de terceros.
      </p>
      <h2 className="page-subtitle">Limitación de Responsabilidad</h2>
      <p className="page-content">
        En ningún caso Noti42 será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de usar nuestro sitio web.
      </p>
      <h2 className="page-subtitle">Cambios en los Términos</h2>
      <p className="page-content">
        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
        Es su responsabilidad revisar periódicamente esta página para estar al tanto de los cambios.
      </p>
    </div>
  );
};

export default TermsAndConditions;
