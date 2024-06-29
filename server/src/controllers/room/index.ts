import createCRUDController from '../crud';
import { ModelsEnum } from '../../utils/constants';

const roomController = createCRUDController(ModelsEnum.Room);

export default roomController;
