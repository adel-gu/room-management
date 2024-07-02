import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

interface Props {
  size?: string;
  color?: string;
}

const StyledSpinner = styled.div`
  margin-inline: auto;
`;

const Spinner = ({ size = 'lg', color = 'primary' }: Props) => {
  return (
    <StyledSpinner>
      <Oval
        visible={true}
        height={size === 'lg' ? 50 : 20}
        width={size === 'lg' ? 50 : 20}
        color={color === 'primary' ? '#4f46e5' : '#f9fafb'}
        secondaryColor={color}
        strokeWidth={5}
      />
    </StyledSpinner>
  );
};
export default Spinner;
