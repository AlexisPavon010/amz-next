// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

export default (req, res) => {
  const { products, user } = req.body;

  

  const tranformsItems = products.map(item => (
    {
      id: item.id,
      title: item.title,
      description: item.description.substring(0, 256),
      category_id: item.category,
      picture_url: item.image,
      quantity: 1,
      currency_id: 'ARS',
      unit_price: item.price
    }
  ))

  // Crea un objeto de preferencia
  const preference = {
    payer: {
      name: user.name,
      surname: '',
      email: user.email, 
    },
    metadata: {
      email: user.email
    },
    items: tranformsItems,
    back_urls: {
      success: 'https://amz-next.vercel.app/success',
      failure: 'https://amz-next.vercel.app/failure',
      pending: 'https://amz-next.vercel.app/pending',
    },
    auto_return: "approved",
  };


  mercadopago.preferences.create(preference)
    .then(function (response) {
      const { init_point } = response.body;
      console.log(response.body)
      res.send({init_point,})
      // console.log(preference, payer)

    }).catch(function (error) {
      console.log(error);
    });
}
