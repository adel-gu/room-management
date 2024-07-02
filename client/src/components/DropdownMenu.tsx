import {
  createContext,
  FC,
  HtmlHTMLAttributes,
  ReactElement,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import useClickOut from '../hooks/utils/useClickOut';

/* -------------------------------------------------------------------------- */
/*                                    Props                                   */
/* -------------------------------------------------------------------------- */
interface DropDownProp extends HtmlHTMLAttributes<HTMLDivElement> {}

interface DropDownTriggerProps extends HtmlHTMLAttributes<HTMLDivElement> {}

interface DropDownContentProps extends DropDownProp {}

interface DropDownGroupProps extends HtmlHTMLAttributes<HTMLUListElement> {}

interface DropDownItemProps extends HtmlHTMLAttributes<HTMLLIElement> {
  icon: ReactElement;
  onClick: () => void;
  disabled: boolean;
}
/* ------------------------------ End of Props ------------------------------ */

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const StyledDropDownMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const StyledDropDownMenuTrigger = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & > svg {
    color: var(--color-grey-700);
  }
`;

const StyledDropDownMenuContent = styled.div`
  position: absolute;
  top: 3.8rem;
  z-index: 1000;

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

const StyledDropDownMenuGroup = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledDropDownMenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem 2.4rem;
  background: none;
  border: none;
  font-size: 1.4rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:focus {
    outline: none;
  }

  & > svg {
    width: 1.8rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
/* ------------------------------ End of styles ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

type DropDownContextType = {
  isOpen?: boolean;
  openDropDown?: () => void;
  closeDropDown?: () => void;
};

const DropDownContext = createContext<DropDownContextType>({});

/* ----------------------------- End of Context ----------------------------- */

const DropDownMenu: FC<DropDownProp> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDropDown = () => setIsOpen(true);
  const closeDropDown = () => setIsOpen(false);

  const value = {
    isOpen,
    openDropDown,
    closeDropDown,
  };

  return (
    <DropDownContext.Provider value={value}>
      <StyledDropDownMenu>{children}</StyledDropDownMenu>
    </DropDownContext.Provider>
  );
};

const DropDownMenuTrigger: FC<DropDownTriggerProps> = ({ children }) => {
  const { openDropDown } = useContext(DropDownContext);
  return (
    <StyledDropDownMenuTrigger onClick={openDropDown}>
      {children}
    </StyledDropDownMenuTrigger>
  );
};

const DropDownMenuContent: FC<DropDownContentProps> = ({ children }) => {
  const { isOpen, closeDropDown } = useContext(DropDownContext);
  const ref = useClickOut(() => closeDropDown?.());

  if (!isOpen) return;

  return (
    <StyledDropDownMenuContent ref={ref}>{children}</StyledDropDownMenuContent>
  );
};

const DropDownMenuGroup: FC<DropDownGroupProps> = ({ children }) => {
  return <StyledDropDownMenuGroup>{children}</StyledDropDownMenuGroup>;
};

const DropDownMenuItem: FC<DropDownItemProps> = ({
  children,
  icon,
  onClick,
  disabled,
}) => {
  const { closeDropDown } = useContext(DropDownContext);
  return (
    <li>
      <StyledDropDownMenuItem
        onClick={() => {
          onClick();
          closeDropDown?.();
        }}
        disabled={disabled}
      >
        {icon}
        <span>{children}</span>
      </StyledDropDownMenuItem>
    </li>
  );
};

export default Object.assign(DropDownMenu, {
  Trigger: DropDownMenuTrigger,
  Content: DropDownMenuContent,
  Group: DropDownMenuGroup,
  Item: DropDownMenuItem,
});
