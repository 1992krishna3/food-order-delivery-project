import React, {  useState } from 'react'
import upload_area from '../assets/upload_area.png'
import axios from 'axios'

const Add = () => {
    const url = "http://localhost:3000";
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onsubmitHandler = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        try {
         const response = await axios.post(`${url}/api/food/add`, formData, {
           headers: {
              'Content-Type': 'multipart/form-data',
           },
        });
        if (response.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                category:"salad"
            })
            setImage(null);
            alert('Food item added successfully!');
        }
        else {
            console.error('Failed to add the food item:', response.data);
            }
        }catch (error) {
            console.error('Error occurred while adding the food item:', error);
        }
    }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onsubmitHandler}>
            <div className="add-img-upload flex-col">
               <p>Upload Image</p>
               <label htmlFor="image" >
                <img src={image?URL.createObjectURL(image):upload_area} alt=""/>
               </label>
               <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} type="text" name='name' placeholder='type-here'/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required/>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category">
                    <option value="Salad">Salad</option> 
                    <option value="Rolls">Rolls</option> 
                    <option value="Deserts">Deserts</option> 
                    <option value="Sandwich">Sandwich</option> 
                    <option value="Cake">Cake</option> 
                    <option value="Pure Veg">Pure Veg</option> 
                    <option value="pasta"></option> 
                    <option value="Noodles"></option> 
                    </select>
                </div>
                 <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
                 </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
