import { Option } from '../types/filter';

interface Props {
  item: Option;
}

const SortByItem = ({ item }: Props) => {
  return <option value={item.value}>{item.label}</option>;
};
export default SortByItem;
