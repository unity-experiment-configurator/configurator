module.exports = {
  async redirects() {
    return [
      {
        source: '/video',
        destination: 'https://vimeo.com/575105264',
        permanent: true,
      },
    ]
  },
}