import { pool } from './database.js'
import './dotenv.js'
import stationaryData from '../data/stationary.js'

const createStationaryTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS stationary;

        CREATE TABLE IF NOT EXISTS stationary (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            audience VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            submittedBy VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 stationarys table created successfully')
    } catch (err) {
        console.error('⚠️ error creating stationarys table', err)
    }
}

const seedStationaryTable = async () => {
    await createStationaryTable()

    stationaryData.forEach((stationary) => {
        const insertQuery = {
            text: 'INSERT INTO stationary (name, pricePoint, audience, image, description, submittedBy) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            stationary.name,
            stationary.pricePoint,
            stationary.audience,
            stationary.image,
            stationary.description,
            stationary.submittedBy,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting stationary', err)
                return
            }

            console.log(`✅ ${stationary.name} added successfully`)
        })
    })
}

seedStationaryTable()
