import { fadeIn, slideDown } from "modules/common/utils/animations";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const PreviewWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(48, 67, 92, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  z-index: 100;
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  cursor: zoom-out;

  img {
    width: auto;
    max-width: 80%;
    max-height: 80%;
    max-height: 80vh;
    box-shadow: 0 2px 10px -3px rgba(0, 0, 0, 0.5);
    transition: max-width 0.1s ease, max-height 0.1s ease;
    animation-name: ${slideDown};
    animation-duration: 0.3s;
    animation-timing-function: ease;
  }
`;

const Image = styled.img`
  cursor: zoom-in;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const KEYCODES = {
  ESCAPE: 27
};

type Props = {
  src?: string;
  alt?: string;
  onLoad?: () => void;
  full?: boolean;
};

type State = {
  visible: boolean;
};

class ImageWithPreview extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleImage = this.toggleImage.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  toggleImage() {
    this.setState({ visible: !this.state.visible });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.visible) {
      this.setState({ visible: false });
    }
  }

  render() {
    const { src, alt, onLoad } = this.props;

    return (
      <div>
        <Image {...this.props} onLoad={onLoad} onClick={this.toggleImage} />
        {this.state.visible && (
          <PreviewPortal>
            <PreviewWrapper onClick={this.toggleImage}>
              <img alt={alt} src={src} />
            </PreviewWrapper>
          </PreviewPortal>
        )}
      </div>
    );
  }
}

class PreviewPortal extends Component<{ children: React.ReactNode }> {
  private el;

  constructor(props) {
    super(props);

    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default ImageWithPreview;
