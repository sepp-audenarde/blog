import "./App.module.scss";

import styles from "./App.module.scss";
import { animated, useSpring } from "@react-spring/web";

import { Routes, Route } from "react-router-dom";
import Users from "./components/users/Users";
import Personal from "./components/personal/Personal";
import PostsList from "./components/postsList/PostsList";
import SinglePost from "./components/singlePost/SinglePost";
import Empty from "./components/empty/Empty";
import ErrorPage from "./components/error/ErrorPage";
import Center from "./components/center/Center";

import { useGlobalContext } from "./context/context";
import { useGesture } from "@use-gesture/react";
import Drag from "./components/drag/Drag";

function App() {
	const { users }: any = useGlobalContext();

	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

	function toBase(): void {
		api.start({ x: 0, y: 0 });
	}

	const bind = useGesture(
		{
			onDrag: ({ offset: [x, y] }) => {
				api.start({ x, y });
			},
			onHover: ({ active }) => {
				document.body.style.cursor = active ? "grab" : "auto";
			},
			onPointerDown: () => (document.body.style.cursor = "grabbing"),
			onPointerUp: () => (document.body.style.cursor = "grab"),
		},
		{
			drag: {
				bounds: { left: -250, right: 250, top: -100, bottom: 200 },
				rubberband: true,
				from: () => [x.get(), y.get()],
			},
		},
	);

	return (
		<animated.div className={styles.app} style={{ x, y }}>
			<Drag bind={bind} toBase={toBase} />
			<Users users={users} />
			<Center>
				<Routes>
					{/* все посты */}
					<Route element={<Empty />} path={"/"} />
					<Route element={<PostsList />} path={"/posts/:id?"} />
					<Route element={<SinglePost />} path={"/post/:id"} />
					<Route element={<ErrorPage />} path={"*"} />
				</Routes>
			</Center>
			<Personal />
		</animated.div>
	);
}

export default App;
