import React, { useContext, useEffect } from 'react'
// import './NewCollection.css'
import { ShopContext } from '../../context/ShopContext'
import newCollection from '../assets/new_collections'
import Items from '../Items/Items'
const NewCollection = () => {
  const {newCollection, getNewCollection} = useContext(ShopContext);

  useEffect(() => {
    getNewCollection();
  }, [])
  
  return (
    <div className='new-collections'>
        <h1>GYM COLLECTIONS</h1>
        <hr/>
        <div className="collections">
            {newCollection.map((item,i)=>{
                return <Items key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollection