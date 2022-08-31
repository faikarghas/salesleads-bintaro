
// export const API_URL = 'https://api.bintarojaya.id'
export const API_URL = process.env.NEXT_PUBLIC_NODE_ENV !== 'development' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:2611'

export const API_URL_LOCAL = 'http://localhost:2611'

