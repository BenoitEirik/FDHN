const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.STRIPE_SK)

app.use(express.static('public'))
app.use(express.json())

app.post('/create', async (req, res) => {
  const { metadata } = req.body

  // Create customer
  const customer = await stripe.customers.create({
    name: `${metadata.lastname} ${metadata.firstname}`,
    email: metadata.email,
    address: {
      line1: metadata.address,
      postal_code: metadata.zipcode,
      city: metadata.city
    }
  })

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price_data: {
          unit_amount: metadata.amount,
          currency: 'eur',
          recurring: {
            interval: 'month'
          },
          product: process.env.STRIPE_SUB_PROD_ID // Link with product created on Stripe dashboard
        }
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  })

  res.send({
    subscription: {
      customerId: customer.id,
      subscriptionId: subscription.id
    },
    paymentIntent: {
      id: subscription.latest_invoice.payment_intent.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    }
  })
})

app.post('/update', async (req, res) => {
  const { customerId, subscriptionId, metadata } = req.body

  const customer = await stripe.customers.update(
    customerId,
    {
      name: `${metadata.lastname} ${metadata.firstname}`,
      email: metadata.email,
      address: {
        line1: metadata.address,
        postal_code: metadata.zipcode,
        city: metadata.city
      }
    }
  )

  // Delete previous subscription generated
  await stripe.subscriptions.del(
    subscriptionId
  )

  // Recreate subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price_data: {
          unit_amount: metadata.amount,
          currency: 'eur',
          recurring: {
            interval: 'month'
          },
          product: process.env.STRIPE_SUB_PROD_ID // Link with product created on Stripe dashboard
        }
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  })

  console.log('subscription =', subscription)

  res.send({
    subscription: {
      customerId: customer.id,
      subscriptionId: subscription.id
    },
    paymentIntent: {
      id: subscription.latest_invoice.payment_intent.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    }
  })
})

module.exports = app
