import logo from './logo.svg';
import './App.css';
import Category from './Category';
import { useEffect, useState } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import Example from './Example';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  let [finalCategory, setCategory] = useState([])
  let [finalProduct, setFinalproduct] = useState([])
  let [catName, setCatname] = useState('')
  let [loader, setLoader] = useState(false)


  let [cartItems, setCartItems] = useState([]);

  let addToCart = (index) => {
    setCartItems([...cartItems, index])
  };

  let getCategory = () => {
    setLoader(true)
    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes)
        setCategory(finalRes)
        setLoader(false)
      })

  }

  let getProduct = () => {
    setLoader(true)
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((finalRes) => {

        setFinalproduct(finalRes.products)
        setLoader(false)
      })

  }

  useEffect(() => {
    getCategory();
    getProduct();
  }, [])

  useEffect(() => {
    if (catName !== '') {
      setLoader(true)
      fetch(`https://dummyjson.com/products/category/${catName}`)
        .then((res) => res.json())
        .then((finalRes) => {
          console.log(catName)
          setFinalproduct(finalRes.products)
          setLoader(false)
        })

    }
  }, [catName])


  let pitems = finalProduct.map((product, index) => {
    return (
      <>
      <ProductItem key={index} pData={product}  addToCart={addToCart}/>
      </>
    )
  })

 

  return (
    <>
      <div className='py-[60px]'>
        <div className='max-w-[1320px] mx-auto'>
          <div className='top'>
          <h2 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h2> 
          <button className='view-cart'><Example cartitems={cartItems}/></button>
          </div>
          <div className='py-[20px] grid grid-cols-[30%_auto] gap-[20px]'>
            <div>
              <img src='https://i.gifer.com/ZKZg.gif' width={100} className={loader ? 'loader-show' : 'loader'}></img>
              <Category finalCategory={finalCategory} setCatname={setCatname} />
            </div>

            <div>
              <div className='grid sm:grid-cols-3 grid-cols-1 gap-4'>

                {finalProduct.length >= 1
                  ? pitems
                  :
                  'No Product Found'
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;


function ProductItem({ pData, addToCart }) {

  return (

    <div className='shadow-lg pb-4 text-center product'>
      <img src={pData.thumbnail} className='w-[100%] h-[220px]'></img>
      <h4 className='text-[22px]'>{pData.title}</h4>
      <b>Rs.{pData.price}</b><br></br>
      <button className='cart' onClick={() => addToCart(pData)}>Add to cart</button>
    </div>
    
  )
}