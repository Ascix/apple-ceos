const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')

const ceoData = require('./data')

const hostname = 'localhost'
const port = 3000

const app = express()
const server = http.createServer(app)

app.engine('html', es6Renderer)
app.set('views', 'templates') // set 'views' setting to look in 'templates' folder
app.set('view engine', 'html') // set default 'view engine' to the one registered for html
const partials = {
    head: 'partials/head',
    foot: 'partials/foot'
}

// app.use(express.static('./public'))

// routes
app.get('/', (req, res) => {
    res.render('home', {
        partials,
        locals: {
            title: 'Home'
        }
    })
})

app.get('/ceos', (req, res) => {
    res.render('ceo-list', {
        partials,
        locals: {
            title: 'CEOs',
            data: ceoData
        }
    })
})

app.get('/ceos/:slug', (req, res) => {
    const { slug } = req.params;
    const ceo = ceoData.find((ceo => ceo.slug === slug))
    if (ceo) {
        res.render('ceo-details', {
            partials,
            locals: {
                title: `${ceo.name}`,
                ceo
            },
            
        });
    } else {
        res.status(404).send(`No ceo found that matches slug, ${slug}`);
    }
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})