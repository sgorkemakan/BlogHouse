import { FaEye } from "react-icons/fa";
import DefaultPoster from "../assets/poster.jpg";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteStory } from "../features/storiesSlice";

function Story() {
  const user = useSelector((state) => state.auth.data);

  const { id } = useParams();
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(deleteStory(id));
      navigate("/");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/stories/${id}`)
      .then((res) => {
        setStory(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container-lg my-5">
      {loading ? (
        <div className="text-center mt-5">
          <h3 className="text-secondary fw-bold fs-4">Wait a sec...</h3>
        </div>
      ) : (
        <div className="row text-center justify-content-center">
          <div className="rounded">
            <img
              src={
                story.poster
                  ? `http://localhost:5000/${story.poster}`
                  : DefaultPoster
              }
              alt={story.title}
              height="300px"
              width="200px"
            />
          </div>
          <h2 className="lead fw-bold mt-5">{story.title}</h2>
          {user && user._id === story.author._id ? (
            <div className="mt-3">
              <div className="d-flex flex-row justify-content-center text-center">
                <div>
                  <Link to={`/update/${story._id}`}>
                    <button className="btn btn-secondary">Edit</button>
                  </Link>
                </div>
                <div>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(story._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <h4 className="text-primary lead fw-bold mt-5">
            Published by {story.author.username}
          </h4>
          <p className="text-secondary lead fw-bold mt-2">
            <FaEye className="me-2" />
            Seen by {story.views}
          </p>
          <p className="lead fw-normal mt-2">{story.text}</p>
        </div>
      )}
    </div>
  );
}

export default Story;
