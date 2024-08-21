import React, { useEffect, useState } from 'react'
import axios from "axios"

const List = () => {

  const url = "http://localhost:3000"
  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {

    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div>
      list
    </div>
  )
}

export default List
