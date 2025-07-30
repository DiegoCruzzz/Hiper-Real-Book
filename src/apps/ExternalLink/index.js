import { h, Component } from 'preact';
import { useEffect } from 'preact/hooks';

class ExternalLinkApp extends Component {
  static getInitialState() {
    return {};
  }
  componentDidMount() {
    const { url, onClose } = this.props;


    if (url) {

      window.open(url, '_blank');
    } else {

    }

    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  render() {
    return null;
  }
}
export default ExternalLinkApp;
