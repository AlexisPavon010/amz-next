const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { items, email } = req.body;

    const tranformsItems = items.map(item => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'gbp',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: tranformsItems,
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        },
    });

    res.status(200).json({ id: session.id })
}