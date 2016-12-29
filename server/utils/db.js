import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'stark'
}

function getConnection() {
  return mysql.createConnection(config)
}

function mapTableToModel(table, Model) {
  if (!table || !Model) throw new Error('Unexcepted table or Model')
  function mapRowToModel(row, Model) {
    const model = {}
    for (let key in Model) {
      if (row[key] === undefined) throw new Error(`There is no ${key} in table`)
      model[Model[key]] = row[key]
    }
    return model
  }
  if (Array.isArray(table)) {
    const rows = []
    table.forEach(row => {
      const model = mapRowToModel(row, Model)
      rows.push(model)
    })
    return rows
  } else {
    return mapRowToModel(table, Model)
  }
}

const exportObj = {
  getConnection,
  mapTableToModel
}

export default exportObj
