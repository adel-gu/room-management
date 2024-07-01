import { X } from 'lucide-react';
import {
  cloneElement,
  createContext,
  FC,
  HtmlHTMLAttributes,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

/* -------------------------------------------------------------------------- */
/*                                    Props                                   */
/* -------------------------------------------------------------------------- */
interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {}

interface ModalTriggerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactElement;
}

interface ModalContentProps extends ModalTriggerProps {}

/* ------------------------------ End of Props ------------------------------ */

/* -------------------------------------------------------------------------- */
/*                                Modal Context                               */
/* -------------------------------------------------------------------------- */
type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});
/* -------------------------- End of Modal Context -------------------------- */

/* -------------------------------------------------------------------------- */
/*                           Modal Styled Components                          */
/* -------------------------------------------------------------------------- */

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.8em;
  right: 0.8em;

  border: none;
  background: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & > svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;
/* --------------------- End of Modal Styled Components --------------------- */

const Modal: FC<ModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value = {
    isOpen,
    openModal,
    closeModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const ModalTrigger: FC<ModalTriggerProps> = ({ children }) => {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal() });
};

const ModalContent: FC<ModalContentProps> = ({ children }) => {
  const { isOpen, closeModal } = useContext(ModalContext);

  if (!isOpen) return;

  return createPortal(
    <Overlay>
      <StyledModal>
        <CloseBtn onClick={closeModal}>
          <X />
        </CloseBtn>
        <div>{cloneElement(children, { handleClose: closeModal })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
};

export default Object.assign(Modal, {
  Trigger: ModalTrigger,
  Content: ModalContent,
});
