import createDoc from './create';
import deleteDoc from './delete';
import readDoc from './read';
import readAllDoc from './readAll';
import updateDoc from './update';

const createCRUDController = (model: string) => ({
  create: createDoc(model),
  readAll: readAllDoc(model),
  read: readDoc(model),
  update: updateDoc(model),
  delete: deleteDoc(model),
});

export default createCRUDController;
