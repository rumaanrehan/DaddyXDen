import React, { useContext, useState } from 'react'
import './AddProduct.css'
import uploadArea from '../../assets/upload_area.svg'
import ProductContext from '../../Context/products/ProductContext'
const AddProduct = () => {
    
    const context = useContext(ProductContext);
    const { addProduct } = context;
    
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        category: "",
        gender:"Men",
        price: "",
        sizes: ["S", "M", "L", "XL"],
        image: ""
    })

    const changeHandler =(e)=>{
        setProductDetails({ ...productDetails, [e.target.name]:e.target.value })
    }
    const imageHandler = (e) =>{
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    }
    const handleAddClick =async (e)=>{
        e.preventDefault();
        console.log(productDetails);
        let resData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res)=> res.json())
        .then((data)=>{resData = data})

        if(resData.success){
            product.image = resData.image_url;
            console.log(product);
        }
        //call add Product
        addProduct(product);
        e.preventDefault();
        // setImage(false);
        console.log("Added Successfully")
    }   // name, description, category, gender, price, sizes, images
  return (
    <div className='addproduct space-y-4 mr-4 justify-center items-center'>
        <h1 className='text-2xl font-bold text-center'>Add Product</h1>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input onChange={changeHandler} value={productDetails.name} type="text" name="name" placeholder='type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Description</p>
            <input onChange={changeHandler} value={productDetails.description} type="text" name="description" placeholder='type here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <input onChange={changeHandler} value={productDetails.category} type="text" name="category" placeholder='type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Gender</p>
                <select name="gender" onChange={changeHandler} value={productDetails.gender} className='addproduct-select' id="">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input onChange={changeHandler} value={productDetails.price} type="text" name="price" placeholder='type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Sizes</p>
            <input onChange={changeHandler} value={productDetails.sizes} type="text" name="sizes" placeholder='type here'/>
        </div>
        
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={!image?uploadArea:URL.createObjectURL(image)} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} value={productDetails.image} type="file" name="image" id='file-input' hidden />
        </div>
        {/*<div className="addproduct-itemfield">
            <label htmlFor="file-input">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <img key={index} src={image} className='addproduct-thumbnail-img' alt={`Uploaded ${index + 1}`} />
                    ))
                ) : (
                    <img src={uploadArea} className='addproduct-thumbnail-img' alt="Upload Area" />
                )}
            </label>
            <input onChange={imageHandler} type="file" name="image" id='file-input' multiple hidden />
        </div>*/}
        <button onClick={handleAddClick} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct