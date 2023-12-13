import "./Bookshelf.scss";
import { Link } from "react-router-dom";

import Rating from "react-rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import axios from "axios";

function Bookshelf() {
  const [booksData, setBooksData] = useState([]);
  const [expandedIds, setExpandedIds] = useState({});

  //get all books
  const getAllBooksData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
      setBooksData(res.data);
      const initialExpandState = res.data.reduce((acc, book) => {
        acc[book._id] = false;
        return acc;
      }, {});
      setExpandedIds(initialExpandState);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };
  useEffect(() => {
    getAllBooksData();
  }, []);

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

  //finish animation
  const [completedIds, setCompletedIds] = useState({});
  const toggleComplete = (id) => {
    setCompletedIds((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // toggle function to see more description
  const toggleExpand = (id) => {
    setExpandedIds((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="bookshelf">
      <div className="bookshelf__book-container">
        {booksData.map((book, index) => (
          <div key={index} className="bookshelf__book">
            <div className="bookshelf__detail">
              <Link to={`/${book._id}`} book={book} className="bookshelf__link">
                <h4 className="bookshelf__title">
                  {book.title}{" "}
                  {completedIds[book._id] && (
                    <span className="bookshelf__finished-badge">Finished</span>
                  )}
                </h4>
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
              <p className="bookshelf__txt--bold">Description</p>
              <div className="bookshelf__description-container">
                <p
                  className={`bookshelf__txt ${
                    expandedIds[book._id] ? "expanded" : ""
                  }`}
                >
                  {book.description}
                  <button
                    onClick={() => toggleExpand(book._id)}
                    className="bookshelf__toggle"
                  >
                    {expandedIds[book._id] ? ". . ." : ". . ."}
                  </button>
                </p>
              </div>
              <p className="bookshelf__txt--bold">Your Commnet</p>
              <p className="bookshelf__txt">{book.comment}</p>
            </div>
            <div className="bookshelf__button-container">
              <button
                className="bookshelf__button"
                onClick={() => toggleComplete(book._id)}
              >
                Finish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;
