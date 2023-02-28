const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.STRIPE_SK)

app.use(express.static('public'))
app.use(express.json())

// Create payment intent
app.post('/create', async (req, res) => {
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

// Update payment intent
app.post('/update', async (req, res) => {
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

app.post('/cancel', async (req, res) => {
  const { id } = req.body

  await stripe.paymentIntents.cancel(id)

  res.sendStatus(204)
})

module.exports = app
