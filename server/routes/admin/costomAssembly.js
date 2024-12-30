const express = require('express');
const { check, param } = require('express-validator');
const router = express.Router();
const validateRequest = require('../../middlewares/handleValidationErrors')
const {
  showCustomAssemblyData,
  showCustomAssemblyDataById,
  addDataAsembly,
  deleteDataAssembly,
  editDataAssembly,
  endpoinEditDataAssembly,
} = require('../../controllers/costomAssemblyController');


router.get('/', showCustomAssemblyData);

router.get(
  '/:id',
  validateRequest([param('id').isMongoId().withMessage('Invalid ID format')]),
  showCustomAssemblyDataById
);

router.get(
  '/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  endpoinEditDataAssembly
);

router.post(
  '/add-component/:id',
  validateRequest([
    param('id').isMongoId().withMessage('Invalid ID format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  addDataAsembly
);

router.put(
  '/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  editDataAssembly
);

router.delete(
  '/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  deleteDataAssembly
);

module.exports = router;