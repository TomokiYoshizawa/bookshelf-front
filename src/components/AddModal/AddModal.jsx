import "./AddModal.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function AddModal({ toggleAddModal }) {
  const clickCancel = () => toggleAddModal();
  const [rating, setRating] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".add-modal");
      if (modal && !modal.contains(event.target)) {
        toggleAddModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleAddModal]);

  AddModal.propTypes = {
    toggleAddModal: PropTypes.func.isRequired,
  };

  // post path
  const navigate = useNavigate();
  const handleAdd = async (event) => {
    event.preventDefault();
    const addBookData = {
      title: event.target.title.value,
      description: event.target.description.value,
      comment: event.target.comment.value,
      rating: parseInt(rating),
    };
    console.log(addBookData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/books`,
        addBookData
      );
      navigate("/");
      toggleAddModal();
      window.location.reload();
    } catch (err) {
      alert("Error: " + err.message);
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
  //   const [rating, setRating] = useState(book.rating || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating); // 新しい評価値を状態に保存
  };

  return (
    <div className="add-modal">
      <form action="submit" className="add-modal__form" onSubmit={handleAdd}>
        <h4 className="add-modal__title">Adding Your Favorite Book</h4>
        <div className="add-modal__container">
          <p className="add-modal__subtitle">Book Title</p>
          <input
            className="add-modal__form--input"
            name="title"
            id="title"
            placeholder="Enter book title"
          />
        </div>
        <div className="add-modal__container">
          <p className="add-modal__subtitle">Description</p>
          <input
            className="add-modal__form--input"
            name="description"
            id="description"
            placeholder="Enter book title"
          />
        </div>
        <div className="add-modal__container">
          <p className="add-modal__subtitle">Comment</p>
          <input
            className="add-modal__form--input"
            name="comment"
            id="comment"
            placeholder="Enter book title"
          />
        </div>
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
        <div className="add-modal__btn-container">
          <button className="add-modal__btn" onClick={clickCancel}>
            Cancel
          </button>
          <button className="add-modal__btn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddModal;
