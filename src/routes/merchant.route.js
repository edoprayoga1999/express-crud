const express = require("express")
const router = express.Router()
const merchantController = require("../controllers/merchant.controller")

const { findMerchant, findMerchantById, createMerchant, updateMerchant, deleteMerchant } = merchantController

router
  .get("/merchant/all", findMerchant)
  .get("/merchant/detail/:id", findMerchantById)
  .post("/merchant/create", createMerchant)
  .put("/merchant/update", updateMerchant)
  .delete("/merchant/delete/:id", deleteMerchant)

module.exports = router