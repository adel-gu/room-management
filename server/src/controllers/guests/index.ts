import createCRUDController from '../crud';
import { ModelsEnum } from '../../utils/constants';

const guestsController = createCRUDController(ModelsEnum.Guest);

export default guestsController;
