const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/monsters', (request, response, next) => {
    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
        if (err) return next(err);
    
        response.json(res.rows);
    });
});

app.get('/monsters/:id', (request, response, next) => {
    const {id: idMonster} = request.params;

    pool.query('SELECT * FROM monsters WHERE id=($1)', [idMonster], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});

app.post('/monsters', (request, response, next) => {
    const {name: monsterName, personality: monsterPersonality} = request.body;

    pool.query(
        'INSERT INTO monsters(name, personality) VALUES($1, $2)',
        [monsterName, monsterPersonality],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/monsters');
        }
    );
});

app.put('/monsters/:id', (request, response, next) => {
    const {id: idMonster} = request.params;
    const keys = ['name', 'personality'];
    let fields = [];

    keys.forEach((key) => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        pool.query(
            `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
            [request.body[field], idMonster],
            (err, res) => {
                if (err) return next(err);

                if (index === fields.length - 1) response.redirect('/monsters');
            }
        );
    });
});

app.delete('/monsters/:id', (request, response, next) => {
    const {id: idMonster} = request.params;

    pool.query(
        'DELETE FROM monsters WHERE id=($1)',
        [idMonster],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/monsters');
        }
    );
});

app.use((err, req, res, next) => {
    res.json(err);
});

module.exports = app;