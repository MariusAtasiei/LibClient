export const getBooksLink = (filters, search) => {
  console.log({ search, filters })
  return `${
    process.env.REACT_APP_API_URL
  }/book?fields=id,title,author,price,image&page=1&limit=20${
    search ? `&search=${search}` : filters ? `&${filters}` : ""
  }`
}
export const filtersLink = `${process.env.REACT_APP_API_URL}/book/filters`

export const bookLink = (id) => `${process.env.REACT_APP_API_URL}/book/id=${id}`

export const imageSrc = ({ _id }) =>
  `${process.env.REACT_APP_API_URL}/book/image/${_id}`

export const cartLink = (cart) =>
  `${
    process.env.REACT_APP_API_URL
  }/book?fields=id,title,author,price,amount&_id=${Object.keys(cart).join(",")}`
