const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=0bbb7942a5f5cbfa5365e3edd8085851&query=${address}`;

    request(
        {
            url,
            json: true,
        },
        (error, _, body) => {
            if (error) {
                callback('Unable to connect to location services!', undefined);
            } else if (body.data.length === 0) {
                callback('Unable to find location!', undefined);
            } else {
                callback(undefined, {
                    latitude: body.data[0].latitude,
                    longitude: body.data[0].longitude,
                    location: body.data[0].name,
                });
            }
        }
    );
};

module.exports = geocode;
