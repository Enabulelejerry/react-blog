import React from 'react'
import user from '../assets/images/user.jpg'

const Sidebar = () => {
  return  <div className="sidebar">
  <article className='about'>
   <h3>About Me</h3>
    <img src={user} alt="" className='about-img' />
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates inventore animi eligendi voluptatum sit nihil, amet nemo veritatis consequuntur omnis?</p>
  </article>

  <article className='cat'>
   <h3>Category</h3>
     <ul className='cat-links'>
       <li><a href="" className='link'>Life</a></li>
       <li><a href="" className='link'>History</a></li>
       <li><a href="" className='link'>Music</a></li>
       <li><a href="" className='link'>Sport</a></li>
     </ul>
  </article>
</div>
}

export default Sidebar