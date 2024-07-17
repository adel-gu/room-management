import createCRUDController from '../crud';
import setMeId from './setMeId';
import { ModelsEnum } from '../../utils/constants';
import setAllowedUpdateData from './setAllowedProfileData';

const createAdminController = () => {
  const CRUDController = createCRUDController(ModelsEnum.Admin);

  let meMethods = {
    setMeId: setMeId,
    allowedProfileData: setAllowedUpdateData,

    create: CRUDController.create,
    readAll: CRUDController.readAll,
    read: CRUDController.read,
    update: CRUDController.update,
    delete: CRUDController.delete,
  };
  return meMethods;
};

const adminController = createAdminController();

export default adminController;
