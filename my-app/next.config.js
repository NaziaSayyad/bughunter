/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl:
      "mongodb+srv://Nazia:Dob1062000@cluster0.p4xc33c.mongodb.net/Blogging?retryWrites=true&w=majority",
      sign : "SECRET1234"
  },
}

module.exports = nextConfig
