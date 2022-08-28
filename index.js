// Require external dependencises
const express = require('express');
const redis = require('redis');

// App and redis client
const app = express();
const client = redis.createClient({
    // Service name in docker-compose.yml
    host: 'redis-server',
    port: 6379
});

// Initialize no. of visits to 0
client.set('visits', 0);

// Route requests made to '/'
app.get('/', (req, res) => {
    // Get no. of visits from Redis client
    client.get('visits', (err,visits) => {
        // Display no. of visits
        res.send('Number of visits: '+visits);
        // Also update no. of visits (var returned from redis is String)
        client.set('visits', parseInt(visits)+1);
    });
});

// Server listen on port 8081
app.listen(8081, ()=>{
    console.log("Listening on port 8081");
});