import React from 'react'
import "./Nav.css"
function NavClient() {
  return (
    <div className='mConatiner'>
     
      <div className='lContainer'>
       <h2> FOOD APP CLIENT</h2>
      </div>
      <div className='rContainer'>

        <a href="/foodlist">FOOD LIST</a>
       <a href="/sfoodclient"> SEARCH FOOD</a>
       <a href="/addorder">ADD ORDER</a>
        <a href="/billing">BILLING</a>
      </div>
    </div>
  )
}

export default NavClient