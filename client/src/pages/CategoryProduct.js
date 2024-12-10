import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryProduct() {
    const params = useParams()
  return (
    <div>
      <h1>Category: {params.category}</h1>
    </div>
  )
}

export default CategoryProduct;
