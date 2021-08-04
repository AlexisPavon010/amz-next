// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

export default (req, res) => {
  const { products, user } = req.body;

  const payer = {
    name: user.name,
    surname: "Luevano",
    email: user.email,
    date_created: new Date(),
    phone: {
      area_code: "",
      number: "949 128 866"
    },
     
    identification: {
      type: "DNI",
      number: "12345678"
    },
    
    address: {
      street_name: "Cuesta Miguel Armendáriz",
      street_number: "1004",
      zip_code: "11020"
    }
  }

  const tranformsItems = products.map(item => (
    {
      id: item.id,
      title: item.title,
      description: item.description.substring(0, 256),
      category_id: item.category,
      quantity: 1,
      currency_id: 'ARS',
      unit_price: item.price
    }
  ))

  // Crea un objeto de preferencia
  const preference = {

    items: tranformsItems,
    back_urls: {
      success: 'https://amz-next-468lgr2zg-alexispavon010.vercel.app/',
      failure: 'https://amz-next-468lgr2zg-alexispavon010.vercel.app/',
      pending: 'https://amz-next-468lgr2zg-alexispavon010.vercel.app/',
    },
    auto_return: "approved",
  };


  mercadopago.preferences.create(preference)
    .then(function (response) {
      const { init_point } = response.body;
      res.send({init_point, preference, payer})
      console.log(preference, payer)

    }).catch(function (error) {
      console.log(error);
    });
}
