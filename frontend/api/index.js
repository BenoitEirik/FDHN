const express = require('express')
const app = express()
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SK)

app.use(express.static('public'))
app.use(express.json())

// Create payment intent
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

// Update payment intent
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

app.post('/create-subscription', async (req, res) => {
  // Create customer
  const customer = await stripe.customers.create({
    name: '',
    email: '',
    address: {
      line1: '',
      postal_code: '',
      city: ''
    }
  })

  console.log('customer =', customer)

  // Create price from customer
  const price = await stripe.prices.create({
    unit_amount: 10000, // TODO:
    currency: 'eur',
    recurring: {
      interval: 'month'
    },
    product: process.env.STRIPE_SUB_PROD_ID // Link with product created on dashboard
  })

  console.log('price =', price)

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      { price: price.id }
    ]
  })

  console.log('subscription =', subscription)
})

module.exports = app
