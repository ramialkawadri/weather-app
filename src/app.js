const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle path engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080/');
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Rami Alkawadri',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rami Alkawadri',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rami Alkawadri',
        helpText: 'This is the help page',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Provide and address',
        });
        return;
    }

    geocode(
        req.query.address,
        (error, { longitude, latitude, location } = {}) => {
            if (error) {
                res.send({ error });
                return;
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({ error });
                    return;
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rami Alkawadri',
        errorMessage: 'Help article not found.',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rami Alkawadri',
        errorMessage: 'Page not found.',
    });
});
