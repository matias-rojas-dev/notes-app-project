import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({category}) => {
    const {slug, name} = category
  return (
    <Link className='home-link' to={`/category/${slug}`}>
        {name}
    </Link>
  )
}

export default Category