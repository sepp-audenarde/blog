import { useEffect } from "react";
import styles from "./PostsList.module.scss";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { animated, useSpring, useTrail, config } from "@react-spring/web";

import Post from "../post/Post";
import { useParams } from "react-router-dom";

const PostsList = () => {
	const navigate = useNavigate();

	const { colorTheme, posts, userInfo, getAllPosts, getPostsOfUserId, getCommentsOfPost }: any = useGlobalContext();

	const params = useParams();
	useEffect(() => {
		if (params.id) {
			getPostsOfUserId(params.id);
		} else {
			getAllPosts();
		}
	}, []);

	const toPost = (postId: number) => {
		navigate(`/post/${postId}`);
		getCommentsOfPost(postId);
	};

	const trails = useTrail(posts ? posts.length : 0, {
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 170,
			...config.molasses,
		},
		immediate: posts?.length > 10,
	});

	const { backgroundColor } = useSpring({
		from: { backgroundColor: "rgba(255, 255, 255, 0)" },
		to: { backgroundColor: colorTheme },
	});

	return (
		<animated.div className={styles.container} style={{ backgroundColor }}>
			<div className={styles.userPosts}>
				<div className={styles.middle}>
					{params.id ? (
						<div>{`Список постов пользователя ${userInfo ? `${userInfo.name}:` : "Loading user..."}`}</div>
					) : (
						<div>Все посты:</div>
					)}
				</div>

				{posts ? (
					<div className="">
						{trails.map((props, i) => (
							<animated.div style={props} key={i}>
								<Post info={posts[i]} toPost={toPost} />
							</animated.div>
						))}
					</div>
				) : (
					"Loading posts..."
				)}
			</div>
		</animated.div>
	);
};

export default PostsList;
