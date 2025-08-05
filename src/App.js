import logo from './logo.svg';
import './App.css';
import Category from './Category';
import { useEffect, useState } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';

function App() {
  let [finalCategory, setCategory] = useState([])
  let [finalProduct, setFinalproduct] = useState([])
  let [catName, setCatname] = useState('')
  let [loader , setLoader] = useState(false)
  let getCategory = () => {
    setLoader(true)
    fetch('https://dummyjson.com/products/category-list')
      .then((res)=> res.json())
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
    .then((finalRes)=> {
      
    setFinalproduct(finalRes.products)
     setLoader(false)
    })
   
  }

  useEffect(() => {
    getCategory();
    getProduct();
  }, [])

  useEffect(()=>{
    if(catName !== '')
    {
      setLoader(true)
      fetch(`https://dummyjson.com/products/category/${catName}`)
    .then((res) => res.json())
    .then((finalRes)=> {
      console.log(catName)
    setFinalproduct(finalRes.products)
     setLoader(false)
    })
   
  }
  },[catName])


  let pitems = finalProduct.map((product,index) => {
    return(
      <ProductItem key={index} pData={product}/>
    )
  })

  return (
    <>
      <div className='py-[40px]'>
        <div className='max-w-[1320px] mx-auto'>
          <h2 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h2>
          <div className='grid grid-cols-[30%_auto] gap-[20px]'>
            <div>
              <img src='https://i.gifer.com/ZKZg.gif' width={100} className={loader ? 'loader-show' : 'loader'}></img>
              <Category finalCategory={finalCategory}  setCatname={setCatname}/>
            </div>

            <div>
              <div className='grid grid-cols-3 gap-4'>
              
              {finalProduct.length >=1
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


function ProductItem({pData}){
  return (

    <div className='shadow-lg pb-4 text-center'>
      <img src={pData.thumbnail} className='w-[100%] h-[220px]'></img>
      <h4>{pData.title}</h4>
      <b>Rs.{pData.price}</b>
    </div>

  )
}