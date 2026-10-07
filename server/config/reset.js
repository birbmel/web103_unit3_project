import { pool } from './database.js'
import './dotenv.js'
import storesData from '../data/stores.js'

const createStoresTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS stationary;

        CREATE TABLE IF NOT EXISTS stationary (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 Art Store table created successfully')
    } catch (err) {
        console.error('⚠️ error creating art stores table', err)
    }
}

const seedStoresTable = async () => {
    await createStoresTable()

    storesData.forEach((stores) => {
        const insertQuery = {
            text: 'INSERT INTO stationary (name, pricePoint, audience, image, description, submittedBy) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            stores.name,
            stores.address,
            stores.image,
            stores.description,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting store', err)
                return
            }

            console.log(`✅ ${stores.name} added successfully`)
        })
    })
}

seedStoresTable()
