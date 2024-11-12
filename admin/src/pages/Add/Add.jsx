import React, {  useState } from 'react';
import axios from 'axios';
import upload_area from '../../assets/upload_area.png';
import './Add.css'

const Add = ({url}) => {
    
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })
    const token = localStorage.getItem('token'); 

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onsubmitHandler = async (event) =>{
        event.preventDefault();
 
 
        // Form validation
 if (!data.name || !data.description || !data.price || !image) {
    alert("Please fill out all fields and upload an image.");
    return;
}


        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        try{
         const response = await axios.post(`${url}/api/v1/foods/add`, formData, {
           headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
         if (response.data && response.data.message === "Food item added successfully") {
            setData({
                name:"",
                description:"",
                price:"",
                category:"salad"
            })
            setImage(false);
            console.log("product added successfully");
            alert("Product added successfully!");
            }
            else{
                console.error("Failed to add product.");  
            }
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
            alert("Failed to connect to the server. Please ensure the backend is running.");
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
                    <option value="Pasta">Pasta</option> 
                    <option value="Noodles">Noodles</option> 
                    </select>
                </div>
                 <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required/>
                 </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add