import { SunMoon } from 'lucide-react';
import ButtonIcon from './ui/ButtonIcon';
import { useThemeContext } from '../context/ThemeContext';

const DarkMode = () => {
  const toggleThemeContext = useThemeContext();
  return (
    <ButtonIcon onClick={toggleThemeContext}>
      <SunMoon />
    </ButtonIcon>
  );
};
export default DarkMode;
