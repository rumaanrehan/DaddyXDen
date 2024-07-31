import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto impedit deserunt voluptate autem nulla enim quisquam labore. Quam culpa accusantium tenetur inventore veniam, quaerat sit ab non ut maiores ad.
            </p>
            <p>
                Ecomnek Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, tempore corporis! Voluptatem alias delectus ad nesciunt nam assumenda, illum impedit placeat, error id aut, quo et numquam! Autem, aperiam blanditiis.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox