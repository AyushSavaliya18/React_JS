import React, { useState, useEffect } from 'react'
import axios from 'axios';
function ProductList({ onEdit, onDelete }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>ProductList
            <h2>Product List</h2>
            {products.map((product) => (
                <div key={product._id}>
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={() => onEdit(product)}>Edit</button>
                    <button onClick={() => onDelete(product._id)}>Delete</button>
                </div>
            ))}



        </div>
    )
}

export default ProductList