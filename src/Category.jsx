import React from 'react'
import './App.css';
export default function Category({finalCategory , setCatname}) {

  let cat = finalCategory.map((v,i) => {
        return(
            <li onClick={() => setCatname(v)}key={i}className='bg-[#ccc] text-[20px] font-[500] font-serif mb-[10px] cursor-pointer p-[8px]'>{v}</li>
        )
    })

  return (
    <div className="font-[600] text-[25px] p-[10px] product-list">Product Category
    <ul>   
    {cat}
    </ul>

    
    </div>
  )
}
