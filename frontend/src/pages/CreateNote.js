import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createNote, getCategories } from "../config";

const CreateNote = (props) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function listNotes() {
      const { categories } = await getCategories("/list");
      setCategories(categories);
    }
    listNotes();
  }, []);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleInputChange = (event) => {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    });
  };

  console.log(note)

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
        await createNote("/note", note)
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
        name="title"
        type="text"
        placeholder="Title"
      />
      <select name="category" onChange={handleInputChange}>
      <option value="none" selected disabled>Select an option</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
            name={category.name}
          >
            {category.name}
          </option>
        ))}
        </select>
      <textarea
        onChange={handleInputChange}
        name="content"
        placeholder="Content"
      />
      
      <button disabled={!note.category} type="submit" className="home-create-note">Save changes</button>
    </form>
  );
};

export default CreateNote;
