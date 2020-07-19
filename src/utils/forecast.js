const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=4fa2abd9da4e166a91be8c4efae88c8a&exclude=minutely,hourly&units=metric'

    request({url, json : true}, (error, {body}={}) => {
        if(error){
            callback("Unable to connect to weather Service", undefined)
        }else if(body.message){
            callback("Unable to get weather for the given location.", undefined)
        }else{
            callback(undefined, "The weather is " + body.current.weather[0].description + ". The current temparature is " + body.current.temp + "°C, Today's minimum temparature is " + body.daily[0].temp.min +"°C and today's maximum temparatute is " + body.daily[0].temp.max +"°C.")
        }
    })
}

module.exports = forecast
