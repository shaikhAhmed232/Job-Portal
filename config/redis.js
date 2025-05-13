const { createClient } = require('redis')
const env = process.env.NODE_ENV || 'development';
const config = require('./redis.config.js')[env];

const redisOption = {}

if (config.url || process.env.REDIS_URL) {
    redisOption.url = config.url || process.env.REDIS_URL
}

const redisClient = createClient(redisOption)

let showRedisError = 0
let redisConnected = false

redisClient.on('error', async (err) => {
    redisConnected = false
    if (!showRedisError++) {
        console.log(`\nError While Connecting Redis \n${err}\n Reconnecting Redis after 5000 ms`)
        await redisClient.disconnect()
        setTimeout(async () => {
            showRedisError = 0
            await connectRedis()
        }, 5000)
    }
});

async function connectRedis() {
    await redisClient.connect();
    if (!showRedisError) { console.log('Redis Connected'), redisConnected = true }
}

connectRedis()

module.exports = { redisConnected, redisClient }