const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=17b341701586d9ac9b7eef2d2db39bd6&query=${latitude},${longitude}&units=m`;

    request(
        {
            url,
            json: true,
        },
        (error, _, body) => {
            if (error) {
                callback('Unable to connect to weather service', undefined);
            } else {
                if (body.hasOwnProperty('success') && body.success === false) {
                    callback('Unable to find location', undefined);
                } else {
                    callback(
                        undefined,
                        `Current temperature is ${body.current.temperature}. It feels like ${body.current.feelslike}. Humidity ${body.current.humidity}`
                    );
                }
            }
        }
    );
};

module.exports = forecast;
