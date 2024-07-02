import styled from 'styled-components';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Spinner from '../Spinner';

interface Props {
  resourceName: string;
  handleDeleteAction: () => void;
  disabled: boolean;
  handleclose?: () => void;
}

const StyledDeleteAction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem 2rem;
  width: 45rem;
  background-color: var(--color-grey-0);

  & > p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & > div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const DeleteAction = ({
  resourceName,
  handleDeleteAction,
  disabled,
  handleclose,
}: Props) => {
  return (
    <StyledDeleteAction>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>Are you sure you want to delete this {resourceName} permanently?</p>

      <div>
        <Button variation="secondary" onClick={handleclose} disabled={disabled}>
          Cancel
        </Button>

        <Button
          variation="danger"
          onClick={handleDeleteAction}
          disabled={disabled}
        >
          {disabled ? <Spinner size="sm" color="secondary" /> : 'Delete'}
        </Button>
      </div>
    </StyledDeleteAction>
  );
};
export default DeleteAction;
