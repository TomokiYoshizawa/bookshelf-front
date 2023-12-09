import "./EditModal.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function EditModal({ book, setBook, toggleEditModal }) {
  //setting the props type
  EditModal.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    }).isRequired,
    setBook: PropTypes.func.isRequired,
    toggleEditModal: PropTypes.func.isRequired,
  };

  const { id } = useParams();
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [comment, setComment] = useState(book.comment);
  const clickCancel = () => toggleEditModal();

  const handleChange = async (event) => {
    event.preventDefault();
    const updatedBookData = {
      title,
      description,
      comment,
    };
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/books/${id}`,
        updatedBookData
      );
      setBook(response.data);
      toggleEditModal(false); //close modal
    } catch (error) {
      console.error("Error updating book data", error);
    }
  };

  // enable to change input value
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="edit-modal">
      <form className="edit-modal__form" onSubmit={handleChange}>
        <h3 className="edit-modal__title">{`Editing "${title}"`}</h3>
        <div className="edit-modal__input-container">
          <p className="edit-modal__txt">Book Title</p>
          <input
            className="edit-modal__form--input"
            name="title"
            id="title"
            placeholder="New Title"
            value={title}
            onChange={handleInputChange(setTitle)}
          />
          <p className="edit-modal__txt">Description</p>
          <input
            className="edit-modal__form--input"
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={handleInputChange(setDescription)}
          />
          <p className="edit-modal__txt">Comment</p>
          <input
            className="edit-modal__form--input"
            name="comment"
            id="comment"
            placeholder="Comment"
            value={comment}
            onChange={handleInputChange(setComment)}
          />
        </div>
        <button className="edit-modal__btn" onClick={clickCancel}>
          Cancel
        </button>
        <button className="edit-modal__btn" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditModal;
