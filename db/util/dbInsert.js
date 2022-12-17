const dbConnect = require('./dbConnect')
const dbSelect = require('./dbSelect')

const dbInsert = (table, data) => {
  const db = dbConnect()

  const fieldsTemp = String([...data.keys()])
  const valuesTemp = String([...data.values()])

  db.serialize(() => {
    db.run(
      `INSERT INTO ${table} (${fieldsTemp}, last_update_datetime)\n` +
        `VALUES(\'${valuesTemp}\', datetime(\'now\', \'localtime\'))`,
      (err) => {
        if (err) {
          return console.error(err.message)
        }

        console.log(
          `data has been inserted into ${table} table.`
        )
      }
    )
  })
  db.close()

  // return dbSelect(table, fieldsTemp, valuesTemp, (rows) =>
  //   console.log(rows)
  // )
}

module.exports = dbInsert