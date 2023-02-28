const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.STRIPE_SK)

app.use(express.static('public'))
app.use(express.json())

async function getPrice (amount) {
  let hasMore = true
  let pricesData
  let startingAfter
  let price

  while (hasMore) {
    // Request existing prices
    const prices = await stripe.prices.list({
      active: true,
      product: process.env.STRIPE_SUB_PROD_ID,
      type: 'recurring',
      ...(startingAfter !== undefined && { starting_after: startingAfter.id })
    })
    pricesData = Array.from(prices.data)
    price = pricesData.find(price => price.unit_amount === amount)
    if (price !== undefined) {
      return price
    }

    if (prices.has_more) {
      startingAfter = pricesData[pricesData.length - 1]
      hasMore = prices.has_more
    } else {
      break
    }
  }

  // Create new price if not found existing
  return await stripe.prices.create({
    unit_amount: amount,
    currency: 'eur',
    recurring: {
      interval: 'month'
    },
    product: process.env.STRIPE_SUB_PROD_ID // Link with product created on Stripe dashboard
  })
}

app.post('/create', async (req, res) => {
  const { description, metadata } = req.body

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

  // Search price or create it
  const price = await getPrice(metadata.amount)

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      { price: price.id }
    ],
    description: `Don récurrent : ${description}`,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  })

  // Update generated paymentIntent from subscription
  const paymentIntent = await stripe.paymentIntents.update(
    subscription.latest_invoice.payment_intent.id,
    { description }
  )

  res.send({
    subscription: {
      id: subscription.id,
      customerId: customer.id
    },
    paymentIntent: {
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret
    }
  })
})

app.post('/update', async (req, res) => {
  const { id, customerId, description, metadata } = req.body

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
  await stripe.subscriptions.del(id)

  // Search price or create it
  const price = await getPrice(metadata.amount)

  // Recreate subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      { price: price.id }
    ],
    description: `Don récurrent : ${description}`,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  })

  // Update generated paymentIntent from subscription
  const paymentIntent = await stripe.paymentIntents.update(
    subscription.latest_invoice.payment_intent.id,
    { description }
  )

  res.send({
    subscription: {
      id: subscription.id,
      customerId: customer.id
    },
    paymentIntent: {
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret
    }
  })
})

app.post('/cancel', async (req, res) => {
  const { id } = req.body

  await stripe.subscriptions.del(id)

  res.sendStatus(204)
})

module.exports = app
