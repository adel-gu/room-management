import createCRUDController from '../crud';
import setMeId from './setMeId';
import { ModelsEnum } from '../../utils/constants';
import setAllowedUpdateData from './setAllowedProfileData';

const createAdminController = () => {
  const CRUDController = createCRUDController(ModelsEnum.Admin);

  let meMethods = {
    setMeId: setMeId,
    readMe: CRUDController.read,
    allowedProfileData: setAllowedUpdateData,
    updateMeProfile: CRUDController.update,
  };
  return meMethods;
};

const adminController = createAdminController();

export default adminController;
