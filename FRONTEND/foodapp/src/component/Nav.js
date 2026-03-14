import React from 'react'
import "./Nav.css"
function Nav() {
  return (
    <div className='mConatiner'>
     
      <div className='lContainer'>
       <h2> FOOD APP ADMIN</h2>
      </div>
      <div className='rContainer'>
       <a href="/addfood">ADD FOOD</a>
        <a href="/foodlist">FOOD LIST</a>
       <a href="/delfood">DELETE FOOD</a>
       <a href="/updfood">UPDATE FOOD</a>
        <a href="/sfood">SEARCH FOOD</a>
         <a href="/contact">CONTACT US</a>
      </div>
    </div>
  )
}

export default Nav