import express from 'express';
import cors from 'cors'


const app = express();

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

app.get('/', (req, res) => {
    res.send('Piou!')
})

app.get('/agents', (req, res) => {
    res.send([
        'Jett',
        'Raze',
        'Breach',
        'Omen',
        'Brimstone',
        'Phoenix',
        'Sage',
        'Sova',
        'Viper',
        'Cypher',
        'Reyna',
        'Killjoy',
        'Skye',
        'Yoru',
        'Astra',
        'Kay/o',
        'Chamber',
        'Neon',
        'Fade',
        'Harbor',
        'Gekko',
        'Deadlock'
    ])
})