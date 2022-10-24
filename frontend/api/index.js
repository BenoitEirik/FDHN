const express = require('express')
const app = express()
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SK)

app.use(express.static('public'))
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
  const { amount, description } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    description,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true
    }
  })

  res.send({
    clientSecret: paymentIntent.client_secret
  })
})

module.exports = app
