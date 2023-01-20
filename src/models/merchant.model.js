const db = require('../config/db');
const merchantModel = {
  createMerchant: (name, website) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO merchant (name, website) VALUES ('${name}', '${website}')`
      db.query(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  findAllMerchant: (name) => {  
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM merchant"
      if (name) {
        query += ` WHERE UPPER(name) LIKE '%${name.toUpperCase()}%' OR UPPER(website) LIKE '%${name.toUpperCase()}%'`
      }
      query += " ORDER BY created_at DESC"
      console.log(query)
      db.query(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  findMerchantById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM merchant WHERE id = '"+id+"'"
      db.query(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateMerchant: (id, name, website) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE merchant SET name = '${name}', website = '${website}', updated_at = NOW() WHERE id = '${id}'`
      db.query(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteMerchant: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM merchant WHERE id = '${id}'`
      db.query(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = merchantModel