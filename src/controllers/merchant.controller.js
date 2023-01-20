const { merchantModel } = require("../models")
const { success, failed } = require('../helpers/response');
const { findAllMerchant, findMerchantById, updateMerchant, deleteMerchant, createMerchant } = merchantModel

const merchantController = {
  findMerchant: async (req, res) => {
    /*
					#swagger.responses[200] = {
            description: 'Success'
    			}
					#swagger.responses[500] = {
            description: 'Error'
    			}
					#swagger.tags = ['Merchant Controller']
		*/
    try {
      const { search } = req.query
      const result = await findAllMerchant(search)
      success(res, {
        code: 200,
        status: true,
        message: "Success",
        data: result.rows
      })
    } catch (error) {
      failed(res, {
        code: 500,
        status: false,
        message: "Error",
        error: error.message
      })
    }
  },
  findMerchantById: async (req, res) => {
    /*
					#swagger.responses[200] = {
            description: 'Success'
    			}
					#swagger.responses[500] = {
            description: 'Error'
    			}
					#swagger.tags = ['Merchant Controller']
		*/
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        throw Error("ID must be a number")
      }
      const result = await findMerchantById(id)
      success(res, {
        code: 200,
        status: true,
        message: result.rows[0] ? "Success" : "Data tidak ditemukan",
        data: result.rows[0] || null
      })
    } catch (error) {
      failed(res, {
        code: 500,
        status: false,
        message: "Error",
        error: error.message
      })
    }
  },
  createMerchant: async (req, res) => {
    /*
					#swagger.responses[200] = {
            description: 'Success'
    			}
					#swagger.responses[500] = {
            description: 'Error'
    			}
					#swagger.tags = ['Merchant Controller']
		*/
    try {
      const { name, website } = req.body;
      const result = await createMerchant(name, website)
      success(res, {
        code: 200,
        status: true,
        message: "Created successfully",
        data: null
      })
    } catch (error) {
      failed(res, {
        code: 500,
        status: false,
        message: "Error",
        error: error.message
      })
    }
  },
  updateMerchant: async (req, res) => {
    /*
					#swagger.responses[200] = {
            description: 'Success'
    			}
					#swagger.responses[500] = {
            description: 'Error'
    			}
					#swagger.tags = ['Merchant Controller']
		*/
    try {
      const { id, name, website } = req.body;
      if (!id) {
        throw Error("ID must be provided");
      } else {
        const checkIsMerchantExist = await findMerchantById(id)
        if (checkIsMerchantExist.rowCount > 0) {
          const result = await updateMerchant(id, name, website)
          success(res, {
            code: 200,
            status: true,
            message: "Updated successfully",
            data: null
          })
        } else {
          failed(res, {
            code: 500,
            status: false,
            message: "Merchant does not exist",
            error: "Failed update"
          })
        }
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: false,
        message: "Error",
        error: error.message
      })
    }
  },
  deleteMerchant: async (req, res) => {
    /*
					#swagger.responses[200] = {
            description: 'Success'
    			}
					#swagger.responses[500] = {
            description: 'Error'
    			}
					#swagger.tags = ['Merchant Controller']
		*/
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        throw Error(isNaN(id) ? "ID must be a number" : "ID must be provided");
      } else {
        const checkIsMerchantExist = await findMerchantById(id)
        if (checkIsMerchantExist.rowCount > 0) {
          const result = await deleteMerchant(id)
          success(res, {
            code: 200,
            status: true,
            message: "Deleted successfully",
            data: null
          })
        } else {
          failed(res, {
            code: 500,
            status: false,
            message: "Merchant does not exist",
            error: "Failed delete"
          })
        }
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: false,
        message: "Error",
        error: error.message
      })
    }
  }
}
module.exports = merchantController