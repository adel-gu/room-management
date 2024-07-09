import createCRUDController from '../crud';
import { ModelsEnum } from '../../utils/constants';

const bookingController = createCRUDController(ModelsEnum.Booking);

export default bookingController;
