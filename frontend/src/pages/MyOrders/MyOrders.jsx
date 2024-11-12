import React from 'react'

const MyOrders = () => {
 
      const [url,token] = useState([StoreContext]);
      const [data,setData] = useState([]);

      const fetchOrders = async () => {
        const response =await axios.post(`${url}/api/orders/userorders`,)

        setData(response.data.data);
      }

      return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order,index)=>{
                    return {
                       
                    }
                })}
            </div>

    </div>
  )
}

export default MyOrders
