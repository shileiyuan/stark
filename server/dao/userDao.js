import userModel from '../models/userModel'
import db from '../utils/db'

async function getUserByName(username) {
  let queryStr = 'select * from user where name = ?'
  const connection = await db.getConnection()
  let [rows, fields] = await connection.execute(queryStr, [username])
  if(rows.length > 0){
    return db.mapTableToModel(rows[0], userModel)
  }
  return null
}

const exportObj = {
  getUserByName
}

export default exportObj