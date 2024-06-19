import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/Blogs.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Blogs = () => {
	const { blogId } = useParams();
	const [blogData, setBlogData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const blogResponse = await axios.get(
					`http://localhost:3000/api/v1/blog/single/${blogId}`
				);

				if (blogResponse.data && blogResponse.data.data) {
					console.log(blogResponse.data.data)

					setBlogData(blogResponse.data.data);
				} else {
					console.error("Unexpected response format:", blogResponse.data);
				}
			} catch (error) {
				console.error("Error fetching blog data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogData();
	}, [blogId]);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const postComment = async (e) => {
		e.preventDefault();
		const comment = e.target.blog_comment.value;
		const data = {
			user_response: comment,
		};
		try {
			const response = await axios.post(
				`http://localhost:3000/api/v1/blog/comment/${blogId}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("user-accessToken")}`,
					},
				}
			);
			// if (response.data && response.data.data) {
			// setBlogData((prevData) => ({
			//     ...prevData,
			//     comments: [...prevData.comments, response.data.data],
			// }));
			e.target.blog_comment.value = ""; // Clear the input field
			//     } else {
			//         console.error("Unexpected response format:", response.data);
			//     }
		}
		catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	const removeComment = async (commentId) => {
		try {
			await axios.delete(`http://localhost:3000/api/v1/blog/comment/${commentId}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("user-accessToken")}`,
				},
			});
			setBlogData((prevData) => ({
				...prevData,
				comments: prevData.comments.filter((comment) => comment._id !== commentId),
			}));
		} catch (error) {
			console.error("Error removing comment:", error);
		}
	};
	const likeUserBlog = async () => {
		try {
			const response = await axios.post(
				`http://localhost:3000/api/v1/blog/like/${blogId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("user-accessToken")}`,
					},
				}
			);
			if (response.data && response.data.data) {
				setBlogData((prevData) => ({
					...prevData,
					likes: response.data.data,
				}));
			} else {
				console.error("Unexpected response format:", response.data);
			}
		} catch (error) {
			console.error("Error liking blog:", error);
		}
	};


	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<NavBar />
			<div className="Parent-blog">
				<div className="root">
					<div className="content">
						<div>
							<h1>{blogData.blog_title}</h1>
						</div>
						<div className="header">
							<div className="profile">
								<div className="image">
									<img src={blogData.blog_createdBy?.avatar} alt="User profile" />
								</div>
								<div className="info">
									<div>
										<span style={{ fontWeight: "bold" }}>
											@{blogData.blog_createdBy?.username}
										</span>
									</div>
									<div>
										<span>{formatDate(blogData.createdAt)}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="image-big">
							<img src={blogData.blogImage} alt="Blog cover" />
						</div>
						<div className="para">{blogData.blog_body}</div>
						<div className="buttons">
							{blogData.blog_tags &&
								blogData.blog_tags.map((tag, index) => (
									<div key={index}>
										<button>{tag}</button>
									</div>
								))}
						</div>
						<div className="icons">
							<div className="left">
								<div className="comment-button">
									<FontAwesomeIcon icon={faComment} />
								</div>
								<span>{blogData.comments?.length || 0}</span>
								<div className="like-button" onClick={likeUserBlog}>
									<FontAwesomeIcon icon={faThumbsUp} />
								</div>
								<span>{blogData.likes?.length || 0}</span>
							</div>
						</div>
						<div className="comm">
							<div className="comments">
								<div className="responses">
									<h1 className="responses">Responses</h1>
								</div>
								<form method="POST" onSubmit={postComment}>
									<div>
										<input
											type="text"
											placeholder="What are your thoughts?"
											id="res"
											name="blog_comment"
										/>
									</div>
									<div className="submit-button">
										<div>
											<button type="submit">Submit</button>
										</div>
									</div>
								</form>
								<div>
									<h3>Previous comments</h3>
								</div>
								{blogData.comments?.map((comment, index) => {
									const isCommentOwner = comment.createdBy?._id === Cookies.get("user-id");
									return (
										<div className="comment-column" key={index}>
											<div className="user-comment">
												<div className="comm-image">
													<img src={comment.createdBy?.avatar} alt="Commenter avatar" />
												</div>
												<div className="comm-desc">
													<div>
														<span>{comment.createdBy?.username}</span>
														<span>{formatDate(comment.createdAt)}</span>
													</div>
													{isCommentOwner && (
														<div>
															<button onClick={() => removeComment(comment._id)} className="remove">
																Remove
															</button>
														</div>
													)}
												</div>
											</div>
											<div className="comment-remove">
												<div className="comment-body">{comment.text}</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Blogs;
