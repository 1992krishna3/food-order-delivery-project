import React, { useEffect, useState } from 'react'
import axios from "axios"
import './List.css';

const List = ({url}) => {

  
  const [list,setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/v1/foods/list`);
    if (response.data) {
      setList(response.data);
      console.log("Updated list:", response.data); 
    }
    
    else {
      
    }
  }
  const removeFood = async(foodId) => {
    const response =await axios.delete(`${url}/api/v1/foods/${foodId}`)
    await fetchList();
  }
  
  useEffect(()=>{
    fetchList();
  },[]);
  
  return (
    <div  className='list add flex-col'>
     <p>All Foods List</p> 
     <div className="list table">
      <div className='list-table-format title'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>{}
      </div>
      
      {list.map((item,index)=>(
        
        <div key={index} className='list-table-format'>
          
            <img src={item.image} alt={item.name}/>
            
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)}className='cursor'>x</p>
          </div>
          
        )
      )}
      </div>
     </div>
    
    
  )
}

export default List