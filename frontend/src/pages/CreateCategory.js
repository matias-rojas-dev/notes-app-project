import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { createACategory } from '../config';

const CreateCategory = (props) => {

    const [category, setCategory] = useState({
        "name": ""
    })

    const handleInputChange = (event) => {
        setCategory({
          [event.target.name]: event.target.value,
        });
      };

      console.log(category)

      const handleInputSubmit = async (event) => {
        event.preventDefault();
    
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {    
            await createACategory("/create-category", category)
            Swal.fire(
              'Created!',
              'Your file has been created.',
              'success'
            )
            props.history.push("/")
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
    
      }
    

  return (
    <form className="createNote-container" onSubmit={handleInputSubmit}>
      <input
        onChange={handleInputChange}
        name="name"
        type="text"
        placeholder="Title"
      />
      
      <button disabled={!category} type="submit" className="home-create-note">Save changes</button>
    </form>
  );
}

export default CreateCategory