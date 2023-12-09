import "./Bookshelf.scss";
import { Link } from "react-router-dom";

import Rating from "react-rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import axios from "axios";

function Bookshelf() {
  const [booksData, setBooksData] = useState([]);

  //get all books
  const getAllBooksData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      setBooksData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching books");
    }
  };
  useEffect(() => {
    getAllBooksData();
  }, []);

  //serach function will be here

  // star rating setting
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

  // const EXCERPT = {
  //   description: 24,
  //   comment: 48,
  // };

  // toggle function
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  return (
    <div className="bookshelf">
      <div className="bookshelf__book-container">
        {booksData.map((book, index) => (
          <div key={index} className="bookshelf__book">
            <div className="bookshelf__detail">
              <Link to={`/${book._id}`} book={book}>
                <h4 className="bookshelf__title">{book.title}</h4>
              </Link>
              <p className="bookshelf__txt--bold">Reputation</p>
              <div className="bookshelf__txt">
                {
                  <Rating
                    emptySymbol={
                      <FontAwesomeIcon
                        icon={faStar}
                        color={COLORS.star.empty}
                      />
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
              <p className="bookshelf__txt--bold">Author</p>
              <p className="bookshelf__txt">{book.description}</p>
              <p className="bookshelf__txt--bold">Your Commnet</p>
              <p className="bookshelf__txt">{book.comment}</p>
            </div>
            <div className="bookshelf__button-container">
              <button className="bookshelf__button">Complete</button>
              <button className="bookshelf__button">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;
