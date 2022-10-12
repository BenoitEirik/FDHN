const express = require('express')
const app = express()
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51LnlDkGhbwlwOqG4cP5StPJnFKBeXGBKGv1dqtPFDAY5xgFLB4h7mw6wcXEfAk7gErvKH8264JkGFZ3pO6Pn7zju00zyXogW00')

app.use(express.static('public'))
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
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
