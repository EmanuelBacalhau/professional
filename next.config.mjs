/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        hostname: 'djereformas.com.br',
      },
      {
        hostname: 'media.istockphoto.com',
      },
      {
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        hostname: 'sebrae.com.br',
      },
      {
        hostname: 'st.depositphotos.com',
      },
      {
        hostname: 'findes.com.br',
      },
      {
        hostname: 'st2.depositphotos.com',
      },
      {
        hostname: 'img.freepik.com',
      },
    ],
  },
}

export default nextConfig
