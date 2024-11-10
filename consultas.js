const { Pool } = require('pg'); //pg
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: 'postgres',
  port: 5432,
});

const obtenerPosts = async () => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const agregarPost = async (titulo, url, descripcion) => {
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
      [titulo, url, descripcion]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { obtenerPosts, agregarPost };