import { Router } from 'express';
import { Admin } from 'mongodb';

const AdminRoutes = Router();

AdminRoutes.get('/',)
AdminRoutes.post('/',)
AdminRoutes.put('/:adminId',)
AdminRoutes.delete('/:adminId',)
AdminRoutes.get('/:adminId',)
AdminRoutes.get('/:adminId/notifications',)
AdminRoutes.get('/:adminId/notifications/:notificationId',)
AdminRoutes.delete('/:adminId/notifications/:notificationId',)
AdminRoutes.get('/:adminId/settings',)
AdminRoutes.put('/:adminId/settings/change-password',)
AdminRoutes.put('/:adminId/settings/change-email',)
AdminRoutes.delete('/:adminId/delete',)



export default AdminRoutes;