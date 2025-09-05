import logo from './logo.svg';
import './App.css';
import Category from './Category';
import { useEffect, useState } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import Example from './Example';


function App() {
  let [finalCategory, setCategory] = useState([])
  let [finalProduct, setFinalproduct] = useState([])
  let [catName, setCatname] = useState('')
  let [loader, setLoader] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
      <ProductItem key={index} pData={product} />
    )
  })

  return (
    <>

      <div className='py-[40px]'>
        <div className='max-w-[1320px] mx-auto'>
          <h2 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h2>
          {/* <h3><Example/></h3> */}
          <div className='grid grid-cols-[30%_auto] gap-[20px]'>
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


function ProductItem({ pData }) {
  return (

    <div className='shadow-lg pb-4 text-center product'>
      <img src={pData.thumbnail} className='w-[100%] h-[220px]'></img>
      <h4>{pData.title}</h4>
      <b>Rs.{pData.price}</b><br></br>
      <button>Add to cart</button>
    </div>

  )
}