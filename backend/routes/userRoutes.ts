import express from 'express'
import { createUser } from '../controllers/create'
import { getTask } from '../controllers/read';
import {deleteUser} from '../controllers/delete'
import {updateUser} from '../controllers/update'
import { updateBulkTask } from '../controllers/read';

const router = express.Router();

router.post('/addUser', createUser)
router.get('/tasks', getTask)
router.put('/tasks/:id', updateUser);
router.delete('/tasks/:id', deleteUser)
router.patch('/tasks/bulkUpdate', updateBulkTask);

export default router;