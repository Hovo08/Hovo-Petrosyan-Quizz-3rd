import mysql from 'mysql2'
import dotEnv from 'dotenv'
dotEnv.config()
const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
}

const connection = mysql.createConnection(dbConfig)

export default connection.promise()
