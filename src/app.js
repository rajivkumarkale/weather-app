path = require('path')
express = require('express')
hbs = require('hbs')
geoCode = require('./utils/geocode')
forecast = require('./utils/forecast')


const app = express()

//define various paths
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//direct server to public asset folder
app.use(express.static(publicDirPath))

//set various folder paths
app.set('view engine','hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)


app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather Application',
        name : 'Rajiv Kumar Kale'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'Help',
        name : 'Rajiv Kumar Kale'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Me',
        name : 'Rajiv Kumar Kale'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
      return res.send({
            error: 'Search term not provided'
        })
    }

    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, response) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                weather : response,
                address : req.query.address
            })
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title : '404 Error',
        error : 'The Help page you are looking for is not found',
        name : 'Rajiv Kumar Kale'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title : '404 Error',
        error : 'Page not found !',
        name : 'Rajiv Kumar Kale'
    })
})
app.listen(3000, () => {
    console.log('Server on port 3000 is up and running.')
})
