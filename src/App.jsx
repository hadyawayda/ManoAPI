import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  async function getData () {
    const res = await fetch('https://api.manoapp.com/api/v1/users/products/whats_new',
      {
        method: 'GET',
        headers: {
          'StoreID': '4',
          'Authorization': 'f44a4aabfc5992514d262d7f517327e7',
          'UserAddressID': '60877'
        },
      }
    );
    const data = await res.json()
    setProducts(data.data.items)
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(products[0])
  return (
    <>
      <div>
        <h1>
          Products:
        </h1>
        <div>
          {products.map((product) => 
            <Product key={product.id} product={product}/>
          )}
        </div>
      </div>
    </>
  )
}

export default App

function Product (product) {
  // console.log(product.product.title)
  const {title, images, price} = product.product
  return ( 
    <>
      <div className='flex flex-col w-80 h-120 border-solid border-2 rounded-lg m-8'>
        <div className='border-b-2 border-solid m-4 pb-4'>
          <img src={`${images[0].small}`} />
        </div>
        <div className='flex grow flex-col w-full p-4 justify-between'>
          <h4 className='text-xs p-2 whitespace-nowrap'>
            {title}
          </h4>
          <div className='text-xs p-2 whitespace-nowrap'>
            $ {price}
          </div>
        </div>
      </div>
    </>
  )
}
// {categories.map((category) => (
//   <div>
//     {category.title}
//   </div>
// ))}
// {quantity}
