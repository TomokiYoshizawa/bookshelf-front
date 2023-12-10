import "./AddModal.scss";

import { useState } from "react";
import axios from "axios";

import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function AddModal({ toggleAddModal }) {
  const clickCancel = () => toggleAddModal();

  const [rating, setRating] = useState("");

  // post path
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
      console.log(response.data);
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

        <button className="add-modal__btn" onClick={clickCancel}>
          Cancel
        </button>
        <button className="add-modal__btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddModal;
