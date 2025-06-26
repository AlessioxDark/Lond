const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');
app.use(express.json());
const pool = new Pool({
	user: 'postgres', // Replace with your PostgreSQL username
	host: 'localhost', // Replace with your database host
	database: 'social_media_db', // Replace with your database name
	password: 'Minu_Artu_2009', // Replace with your PostgreSQL password
	port: 5432, // Default PostgreSQL port
});
pool.connect((err, client, release) => {
	if (err) {
		console.error('Errore connessione database:', err.stack);
	} else {
		console.log('Database connesso con successo');
		release();
	}
});
pool.connect();
app.get('/api/home/posts', (req, res) => {});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
