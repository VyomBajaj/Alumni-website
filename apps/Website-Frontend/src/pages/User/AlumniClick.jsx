import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer"; // Assuming the correct file name is 'Footer'
import Cookies from "js-cookie";
import "../../styles/UserProfilepage.css";
import BlogSectionCard from "../../components/Blog-section-card/BlogSectionCard";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

export const userAtom = atom({
  key: 'user',
  default: {},
});

const AlumniClick = () => {
  const navigate = useNavigate();
  const { alumniId } = useParams();
  const [userBlog, setUserBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUserData = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/getuserbyid/${alumniId}`);
        setUserData(response.data.data);
      } catch (error) {
        console.log("Error occurred:", error.message);
      }
    };
    fetchAlumniData();
  }, [alumniId, setUserData]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blog/author/${alumniId}`);
        setUserBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        setError("Failed to fetch user blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserBlogs();
  }, [alumniId]);

  useEffect(() => {
    console.log("blog data", userBlog);
  }, [userBlog]);

  const createBlog = () => {
    navigate("/createblog");
  };

  const completeProfile = () => {
    navigate("/completeprofile");
  };

  const createEvent = () => {
    navigate("/postevent");
  };

  const createJob = () => {
    navigate("/postjob");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="parent-user">
        <div className="upper-section">
          <div className="profile-card">
            <div className="upper-portion" id="kl">
              <div className="profile-pic">
                <img src={user.avatar} alt="Profile Pic" />
              </div>
              <div className="user-name">
                <div>{user.first_name} {user.last_name}</div>
                <span style={{ fontWeight: "bold" }}>{user.organisation}</span>
              </div>
            </div>
            <div className="lower-portion">
              <div className="user-profile-info">
                <div className="user-mail">
                  <div className="loco-logo">
                    <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
                  </div>
                  <div>{user.email}</div>
                </div>
                <div className="user-phone">
                  <div className="loco-logo">
                    <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
                  </div>
                  <div>{user.phone_number}</div>
                </div>
                <div className="user-loco">
                  <div className="loco-logo">
                    <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
                  </div>
                  <div>{user.city}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-links">
            <div className="unique-link">
              <div className="link1">
                <div className="link-logo">
                  <a href="https://www.linkedin.com">
                    <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="LinkedIn" />
                  </a>
                </div>
                <div>LinkedIn</div>
              </div>
              <div className="link2">
                <div className="link-logo">
                  <a href={user.instagram_handle}>
                    <img src="data:image/jpeg;base64,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" alt="Instagram" />
                  </a>
                </div>
                <div>Instagram</div>
              </div>
            </div>
            <div className="unique-link">
              <div className="link1">
                <div className="link-logo">
                  <a href="mailto:example@gmail.com">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qGmoUH55tCoXEvccuBA09KNqL9n5pSupnQ&s" alt="Gmail" />
                  </a>
                </div>
                <div>Gmail</div>
              </div>
              <div className="link2">
                <div className="link-logo">
                  <a href="https://www.facebook.com">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s" alt="Facebook" />
                  </a>
                </div>
                <div>Facebook</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lower-section">
          <div className="profile-right-panel">
            <div className="profile-line1">
              <div className="profile-heading">
                <div><h1>Personal Info</h1></div>
              </div>
            </div>
            <div className="all-list">
              <div className="inner">
                <div><h3>Batch:</h3></div>
                <div><h4>{user.joining_batch}-{Number(user.joining_batch) + 4}</h4></div>
              </div>
              <div className="inner">
                <div><h3>Branch:</h3></div>
                <div><h4>{user.branch}</h4></div>
              </div>
              <div className="inner">
                <div><h3>City:</h3></div>
                <div><h4>{user.city}</h4></div>
              </div>
              <div className="inner">
                <div><h3>Location:</h3></div>
                <div><h4>{user.city}</h4></div>
              </div>
            </div>
          </div>
          <div className="profile-recent">
            <h1>Recent Posts</h1>
            <div className="recent-blogs">
              {userBlog.map((blog) => (
                <BlogSectionCard key={blog._id} data={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AlumniClick;
