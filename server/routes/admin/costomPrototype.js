const express = require('express');
const { check, param } = require('express-validator');
const router = express.Router();
const validateRequest = require('../../middlewares/handleValidationErrors')
const {
  showCustomPrototypeData,
  showCustomPrototypeById,
  addDataToPrototype,
  deleteDataToPrototype,
  editDataPrototype,
  endpoinEditDataPrototype,
} = require('../../controllers/costomPrototypeController');


router.get('/', showCustomPrototypeData);

router.get(
  '/:id',
  validateRequest([param('id').isMongoId().withMessage('Invalid ID format')]),
  showCustomPrototypeById
);

router.get(
  '/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  endpoinEditDataPrototype
);

router.post(
  '/add-component/:id',
  validateRequest([
    param('id').isMongoId().withMessage('Invalid ID format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  addDataToPrototype
);

router.put(
  '/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  editDataPrototype
);

router.delete(
  '/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  deleteDataToPrototype
);

module.exports = router;
