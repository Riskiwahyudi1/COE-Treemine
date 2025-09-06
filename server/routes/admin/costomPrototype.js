const express = require('express');
const { check, param } = require('express-validator');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const validateRequest = require('../../middlewares/handleValidationErrors')
const {
  showCustomPrototypeData,
  showCustomPrototypeById,
  addDataToPrototype,
  deleteDataToPrototype,
  editDataPrototype,
  endpoinEditDataPrototype,
} = require('../../controllers/costomPrototypeController');


router.get('/costom-prototype', showCustomPrototypeData);

router.get(
  '/costom-prototype/:id',
  validateRequest([param('id').isMongoId().withMessage('Invalid ID format')]),
  showCustomPrototypeById
);

router.get(
  '/costom-prototype/:typeId/item/:itemId',
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  endpoinEditDataPrototype
);

router.post(
  '/costom-prototype/add-component/:id',
  verifyTokenAdm,
  validateRequest([
    param('id').isMongoId().withMessage('Invalid ID format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  addDataToPrototype
);

router.put(
  '/costom-prototype/:typeId/item/:itemId',
  verifyTokenAdm,
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
    check('type').notEmpty().withMessage('Type is required'),
    check('cost').isNumeric().withMessage('Cost must be a number'),
  ]),
  editDataPrototype
);

router.delete(
  '/costom-prototype/:typeId/item/:itemId',
  verifyTokenAdm,
  validateRequest([
    param('typeId').isMongoId().withMessage('Invalid typeId format'),
    param('itemId').isMongoId().withMessage('Invalid itemId format'),
  ]),
  deleteDataToPrototype
);

module.exports = router;
