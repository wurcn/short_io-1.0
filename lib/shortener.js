const ShortIO = require('short.io')

const config = {
  apiKey: process.env.SHORTIO_API_KEY || '',
  domain: 'yourdomain.short.io'
}

const client = new ShortIO({
  apiKey: config.apiKey,
  domain: config.domain
})

module.exports = {
  generate: async (longUrl) => {
    // 返回模拟的短链接
    return `https://short.url/${generateRandomString()}`
  }
}