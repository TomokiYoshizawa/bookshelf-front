import "./EditModal.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import PropTypes from "prop-types";

import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { COLORS } from "../../utils/config";

function EditModal({ book, setBook, toggleEditModal }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".edit-modal");
      if (modal && !modal.contains(event.target)) {
        toggleEditModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleEditModal]);

  //setting the props type
  EditModal.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }).isRequired,
    setBook: PropTypes.func.isRequired,
    toggleEditModal: PropTypes.func.isRequired,
  };

  const { id } = useParams();
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [comment, setComment] = useState(book.comment);
  const [rating, setRating] = useState(book.rating || 0);
  const clickCancel = () => toggleEditModal();

  // edit function
  const handleChange = async (event) => {
    event.preventDefault();
    const updatedBookData = {
      title,
      description,
      comment,
      rating,
    };
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/books/${id}`,
        updatedBookData
      );
      setBook(response.data);
      toggleEditModal(false); //close modal
    } catch (error) {
      console.error("Error updating book data", error);
    }
  };

  const COLORS = {
    main: {
      bg: {},
      primary: {},
      secondary: {},
      accent: {},
    },
    star: {
      full: "#ffd233",
      empty: "#e4dccb",
    },
  };

  // enable to change input value
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // star rating setting
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // delete function
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/books/${id}`
      );
      navigate("/");
      window.location.reload();
      setBook(response.data);
      toggleEditModal(false); //close modal
    } catch (error) {
      console.error("Error updating book data", error);
    }
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
          <div className="form__stars">
            {
              <Rating
                emptySymbol={
                  <FontAwesomeIcon icon={faStar} color={COLORS.star.empty} />
                }
                fullSymbol={
                  <FontAwesomeIcon icon={faStar} color={COLORS.star.full} />
                }
                value={rating}
                fractions={1}
                initialRating={rating}
                onChange={handleRatingChange}
              />
            }
          </div>
        </div>
        <div className="edit-modal__btn-container">
          <button className="edit-modal__btn" onClick={clickCancel}>
            Cancel
          </button>
          <button className="edit-modal__btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="edit-modal__btn" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
