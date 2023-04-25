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
    const data = await res.json();
    setProducts(data.data.items);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div>
        <h1 className='mb-12 mt-4'>
          Products:
        </h1>
        <div className='grid gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => 
            <Product key={product.id} product={product} />
          )}
        </div>
      </div>
    </>
  )
}

export default App

function Product (product) {
  const [open, setOpen] = useState(false);

  const {title, images, price, quantity} = product.product

  return ( 
    <>
      <div type='button' onClick={() => setOpen(true)} className='flex flex-col w-80 cursor-pointer border-solid
      h-120 border-2 border-gray-300 hover:border-sky-400 transition-colors duration-500 rounded-lg m-8'>
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
      {open 
      ? <div className='fixed inset-0 backdrop-blur-sm w-full h-full'>
          <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col justify-center items-center border-2 border-gray-300 border-solid w-5/6 h-5/6 rounded-2xl'>
              <div className='p-4'>
                <img width={450} src={`${images[0].large}`} />
              </div>
              <div className='flex '>
                <div>
                  {title[0]}
                </div>
                <div>
                  {price[0]}
                </div>
                <div>
                  {quantity}
                </div>
                <div>
                  {title}
                </div>
              </div>
            </div>
          </div>
        </div> 
      : null}
      </>

  )
}
// {categories.map((category) => (
//   <div>
//     {category.title}
//   </div>
// ))}
// {quantity}

