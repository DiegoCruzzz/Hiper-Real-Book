// src/apps/ExternalLinkApp.jsx
import { h, Component } from 'preact'; // Importa Component de preact
import { useEffect } from 'preact/hooks'; // useEffect se usará dentro de componentDidMount/WillUnmount si fuera necesario, pero aquí no es el caso

/**
 * Componente de aplicación que abre una URL externa en una nueva pestaña del navegador.
 * No renderiza ninguna interfaz de usuario visible dentro del emulador.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.url - La URL que se abrirá en la nueva pestaña.
 * @param {function} [props.onClose] - Función opcional para cerrar la "ventana" de la aplicación
 * después de abrir el enlace. Esto es útil si tu gestor de ventanas
 * crea una ventana para cada aplicación lanzada.
 */
class ExternalLinkApp extends Component {
  // Método estático requerido por el gestor de ventanas (Shell) para obtener el estado inicial
  // de la ventana de la aplicación. Para ExternalLinkApp, simplemente devuelve un objeto vacío.
  // Este método se adjunta al prototipo de la clase, satisfaciendo la expectativa de Shell.
  static getInitialState() {
    return {};
  }

  // componentDidMount se ejecuta una vez que el componente se ha montado en el DOM.
  // Es el lugar ideal para ejecutar efectos secundarios como abrir una nueva pestaña.
  componentDidMount() {
    const { url, onClose } = this.props;

    // Asegúrate de que la URL exista antes de intentar abrirla
    if (url) {
      console.log(`Abriendo enlace externo: ${url}`);
      window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    } else {
      console.warn('ExternalLinkApp: No se proporcionó una URL.');
    }

    // Si se proporciona una función onClose, la llamamos para cerrar la "ventana"
    // de esta aplicación inmediatamente después de intentar abrir el enlace.
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  // Esta aplicación no renderiza nada visualmente, por lo que su método render devuelve null.
  render() {
    return null;
  }
}

export default ExternalLinkApp;
