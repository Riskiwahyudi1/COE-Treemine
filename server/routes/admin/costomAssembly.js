const express = require('express');
const { check, param } = require('express-validator');
const router = express.Router();
const validateRequest = require('../../middlewares/handleValidationErrors')
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const {
  showCustomAssemblyData,
  showCustomAssemblyDataById,
  addDataAsembly,
  deleteDataAssembly,
  editDataAssembly,
  endpoinEditDataAssembly,
} = require('../../controllers/costomAssemblyController');


router.get('/costom-assembly', showCustomAssemblyData);

router.get(
  '/costom-assembly/:id',
  validateRequest([param('id').isMongoId().withMessage('Invalid ID format')]),
  showCustomAssemblyDataById
);

router.get(
  '/costom-assembly/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  endpoinEditDataAssembly
);

router.post(
  '/costom-assembly/add-component/:id',
  verifyTokenAdm,
  validateRequest([
    param('id').isMongoId().withMessage('Invalid ID format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  addDataAsembly
);

router.put(
  '/costom-assembly/:typeId/item/:itemId',
  verifyTokenAdm,
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  editDataAssembly
);

router.delete(
  '/costom-assembly/:typeId/item/:itemId',
  verifyTokenAdm,
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  deleteDataAssembly
);

module.exports = router;