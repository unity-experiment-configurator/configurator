module.exports = {
  async redirects() {
    return [
      {
        source: '/video',
        destination: 'https://youtu.be/3YdfZOonRGY',
        permanent: true,
      },
    ]
  },
}