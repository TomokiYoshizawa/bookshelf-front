import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Rating from "react-rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditModal from "../EditModal/EditModal";

import "./BookCard.scss";

function BookCard() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  //star rating
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

  // Modal function
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book data", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>cannot find</div>;
  }

  return (
    <div className="bookcard">
      <div className="bookcard__container">
        <h3 className="bookcard__title">{book.title}</h3>
        <p className="bookcard__txt--bold">Description</p>
        <p className="bookcard__txt">{book.description}</p>
        <p className="bookcard__txt--bold">Your Commnet</p>
        <p className="bookcard__txt">{book.comment}</p>
        <div className="bookcard__rating">
          {
            <Rating
              emptySymbol={
                <FontAwesomeIcon icon={faStar} color={COLORS.star.empty} />
              }
              fullSymbol={
                <FontAwesomeIcon icon={faStar} color={COLORS.star.full} />
              }
              fractions={1}
              initialRating={book.rating}
              readonly={true}
            />
          }
        </div>
      </div>
      <div className="bookcard__button-container">
        <button className="bookcard__button" onClick={toggleEditModal}>
          Edit
        </button>
      </div>

      {isEditModalOpen && (
        <EditModal
          book={book}
          setBook={setBook}
          toggleEditModal={toggleEditModal}
        />
      )}

      {/* {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteModal book={book} toggleDeleteModal={toggleDeleteModal} />
        </ModalPortal>
      )
      } */}
    </div>
  );
}

export default BookCard;
