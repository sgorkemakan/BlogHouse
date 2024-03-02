import { Link } from "react-router-dom";
import HeroImg from "../assets/home.png";
import DefaultPoster from "../assets/poster.jpg";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "../features/storiesSlice";

function Home() {
  const { stories, status } = useSelector((state) => state.stories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className="container-lg my-5">
      <div className="row align-items-center align-content-center">
        <div className="col-md-6 mt-5 mt-md-0">
          <div className="text-center">
            <img
              src={HeroImg}
              alt=""
              className="img-fluid"
              height="350px"
              width="450px"
            />
          </div>
        </div>
        <div className="col-md-6 mt-5 mt-md-0 order-md-first">
          <div>
            <h1 className="text-primary text-uppercase fs-1 fw-bold">
              Write Your Own Stories And Share it with Everyone!
            </h1>
            <p className="mt-4 text-muted">
              Welcome to BlogHouse! Whether it's sharing personal stories or
              diving into niche interests, each post is your canvas. Let your
              imagination run wild, play with words, and share your unique
              perspective with the world.
            </p>
            <Link to="/write">
              <button className="btn btn-primary px-3 my-3 fw-bold">
                Write a Story
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <h2 className="fw-bold mb-5">Latest Stories</h2>
            </div>
          </div>
        </div>

        {status === "loading" && (
          <div className="text-center mt-5">
            <h3 className="text-secondary fw-bold fs-4">Loading...</h3>
          </div>
        )}

        {status === "error" && (
          <div className="text-center mt-5">
            <h3 className="text-secondary fw-bold fs-4">
              Oops something went wrong...
            </h3>
          </div>
        )}

        <div className="row">
          {status === "success" &&
            stories.map((story) => (
              <div
                key={story._id}
                className="col-md-6 col-lg-4 text-center text-decoration-none"
              >
                <div className="shadow rounded">
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
                <h2 className="lead fw-bold my-4">{story.title}</h2>
                <Link to={`/story/${story._id}`}>
                  <button className="btn btn-primary text-white lead fw-bold mb-5">
                    Read Story
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
