module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com", "instagram.fcnq2-2.fna.fbcdn.net", "instagram.fcnq2-1.fna.fbcdn.net", "images.cooltext.com", "firebasestorage.googleapis.com"]
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  }
}

