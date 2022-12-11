const express = require('express')
const app = express()
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SK)

app.use(express.static('public'))
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
  const { amount, description, metadata } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    description,
    metadata,
    currency: 'eur',
    receipt_email: metadata.Email,
    automatic_payment_methods: {
      enabled: true
    }
  })

  res.send({
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret
  })
})

app.post('/update-payment-intent', async (req, res) => {
  const { id, amount, description, metadata } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.update(id, {
    amount,
    description,
    metadata,
    receipt_email: metadata.Email
  })

  res.send({
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret
  })
})

module.exports = app
