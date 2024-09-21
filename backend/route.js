const express = require('express')
const router = express.Router()


router.get('/allcountries', async (req, res) => {
    try {
        const response = await fetch(
            "https://date.nager.at/api/v3/AvailableCountries"
        )
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/population', async (req, res) => {
    const country  = req.body;
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/population', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  country: req.body.country })
        });
        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

router.post('/flag', async(req, res) => {
    const {country} = req.body
    try {
        const response = await fetch(
            "https://countriesnow.space/api/v0.1/countries/flag/images",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ country: req.body.country }) 
            }
        )
        const data = await response.json()
        res.send(data)

    } catch (error) {
        console.log(error)
    }
})


router.post('/tag/:tag', async(req, res) => {
    try {
        const response = await fetch(
            `https://date.nager.at/api/v3/CountryInfo/${req.params.tag}`
        )
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router