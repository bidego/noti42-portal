
// frontend/src/analytics.ts

// Declara la interfaz global para gtag, para que TypeScript no se queje.
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Inicializa el script de Google Analytics.
 * @param measurementId - Tu ID de medición de GA (ej: G-XXXXXXXXXX).
 */
export const init = (measurementId: string): void => {
  // Inyecta el script de Google Analytics en el <head>
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Inicializa el dataLayer y la función gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  console.log(`GA Initialized with Measurement ID: ${measurementId}`);
};

/**
 * Envía un evento de vista de página a Google Analytics.
 * @param path - La ruta de la página visitada (ej: /categoria/nombre-articulo).
 */
export const sendPageView = (path: string): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
    console.log(`GA PageView sent for: ${path}`);
  }
};

/**
 * Envía un evento personalizado a Google Analytics.
 * @param name - El nombre del evento (ej: 'article_click').
 * @param params - Un objeto con los parámetros del evento.
 */
export const sendEvent = (name: string, params?: Record<string, any>): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    console.log(`GA Event sent: ${name}`, params);
  }
};
