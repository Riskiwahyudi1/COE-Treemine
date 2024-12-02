const express = require('express');
const router = express.Router();

const {  showCustomPrototypeData, requestCostomPrototype } = require('../../controllers/buyer/costomPrototypeController');



router.get('/', showCustomPrototypeData);
  router.post('/request-costom', requestCostomPrototype);

module.exports = router;