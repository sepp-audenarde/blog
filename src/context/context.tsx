import React, { useContext, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";

type Props = {
	children: React.ReactNode;
};

type Notification = {
	title: string;
	body: string;
	date: string;
	id: string;
};

type Comment = {
	body: string;
	email: string;
	id: number;
	name: string;
	postId: number;
};

const AppContext = React.createContext({});

const AppProvider = ({ children }: Props) => {
	const [users, setUsers] = useState(null!);
	const [userInfo, setUserInfo] = useState(null!);

	const [posts, setPosts] = useState(null!);
	const [postInfo, setPostInfo] = useState(null!);

	const [comments, setComments] = useState<Comment[]>(null!);

	const [colorTheme, setColorTheme] = useState("white");

	const [lastActions, setLastActions] = useState<Notification[]>([
		{
			title: "Уведомление",
			body: "Выполнен вход в приложение",
			date: new Date().toLocaleTimeString(),
			id: uuid(),
		},
	]);

	function createNotification(body: string) {
		const notification = {
			title: "Уведомление",
			body: body,
			date: new Date().toLocaleTimeString(),
			id: uuid(),
		};

		setLastActions((prev) => [notification, ...prev.filter((_e, i) => i < 7)]);
	}

	const base = "https://jsonplaceholder.typicode.com";

	function getAllUsers() {
		// GET /users
		axios.get(base + `/users`).then((response) => {
			const users = response.data;
			setUsers(users);
		});
	}

	function getUser(id: number) {
		// GET /users/1
		axios.get(base + `/users/${id}`).then((response) => {
			const userinfo = response.data;
			setUserInfo(userinfo);
		});
	}

	function getAllPosts() {
		// GET	/posts
		axios.get(base + `/posts`).then((response) => {
			const posts = response.data;
			setPosts(posts);
		});
	}

	function getPostsOfUserId(userId: number): void {
		// GET	/users/1/posts
		setPosts(null!);

		axios.get(base + `/users/${userId}/posts`).then((response) => {
			const posts_list = response.data;
			setPosts(posts_list);
		});

		getUser(userId);
	}

	function getPost(id: number) {
		// GET	/posts
		setPostInfo(null!);
		axios.get(base + `/posts/${id}`).then((response) => {
			const post = response.data;
			setPostInfo(post);
		});
	}

	function getCommentsOfPost(postId: number) {
		axios.get(base + `/posts/${postId}/comments`).then((response) => {
			const comments_list = response.data;
			setComments(comments_list);
		});
	}

	function publishCommentToPost(postId: number, body: string, title: string) {
		axios
			.post(
				`https://jsonplaceholder.typicode.com/comments`,
				{
					body: title,
					email: "Вы",
					name: body,
					postId: postId,
				},
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				},
			)
			.then((response) => response.data)
			.then((data) => {
				setComments((prev) => [data, ...prev]);
			});
	}

	return (
		<AppContext.Provider
			value={{
				getAllUsers,
				setUsers,
				getUser,
				users,
				getPostsOfUserId,
				setPosts,
				posts,
				userInfo,
				setUserInfo,
				getAllPosts,
				getCommentsOfPost,
				comments,
				postInfo,
				getPost,
				publishCommentToPost,
				colorTheme,
				setColorTheme,
				setLastActions,
				lastActions,
				createNotification,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
