import axios from 'axios'

export const getCart = async () => {
  const res = await axios.get('https://64ef20d5219b3e2873c3fd48.mockapi.io/cart')
  return res
}

export const getFavorites = async () => {
  const res = await axios.get('https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite')
  return res
}

export const getProducts = async () => {
  const res = await axios.get('https://64ef20d5219b3e2873c3fd48.mockapi.io/sneakers')
  return res
}

export const addToCart = async (obj) => {
  const res = await axios.post('https://64ef20d5219b3e2873c3fd48.mockapi.io/cart', obj)
  return res
}

export const deleteFromCart = async (obj) => {
  const res = await axios.delete(
    `https://64ef20d5219b3e2873c3fd48.mockapi.io/cart/${obj.mockApiId}`,
  )
  return res
}

export const addToFavorites = async (obj) => {
  const res = await axios.post('https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite', obj)
  return res
}

export const deleteFromFavorites = async (obj) => {
  const res = await axios.delete(
    `https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite/${obj.mockApiId}`,
  )
  return res
}
