import { useEffect, useState } from "react";
import styles from "./SinglePost.module.scss";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

import Comment from "../comment/Comment";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

import emoji from "/images/emoji.svg";
import { animated, useSpring, useTrail, config } from "@react-spring/web";
import { firstLetterToUpperCase } from "../../utils/utils";
import { separateMessage } from "../../utils/utils";

interface SinglePostInfoProps {
	info: {
		title: string;
		body: string;
	};
}

const SinglePostInfo = ({ info }: SinglePostInfoProps) => {
	const { title, body } = info;
	return (
		<div className={styles.singlePost}>
			<div className={styles.title}>{firstLetterToUpperCase(title)}</div>
			<div className={styles.body}>{firstLetterToUpperCase(body)}</div>
		</div>
	);
};

const EnterComment = () => {
	const [isOpen, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const params = useParams();
	const onEmojiClick = ({ emoji }: { emoji: string }) => setMessage(`${message} ${emoji}`);

	const { postInfo, publishCommentToPost, createNotification }: any = useGlobalContext();

	useEffect(() => {
		setOpen(false);
		setMessage("");
	}, []);

	function sendMessage() {
		setMessage("");
		if (message.trim() === "") return;
		const { title, body }: { title: string; body: string } = separateMessage(message);
		publishCommentToPost(params.id, title, body);
		createNotification(`Опубликован комментарий к посту ${firstLetterToUpperCase(postInfo.title).slice(0, 10)}...`);
	}

	function handleChange(text: string) {
		setMessage(text);
	}

	return (
		<div className={styles.commentLine}>
			<textarea
				className={styles.textareaComment}
				placeholder="Написать комментарий"
				value={message}
				onChange={(e) => handleChange(e.target.value)}
				autoComplete="off"
				required
			/>

			<div className={styles.buttons}>
				<div className={styles.emoji}>
					<img draggable={false} src={emoji} alt="" onClick={() => setOpen(!isOpen)} />

					{isOpen && (
						<div className={styles.emojies}>
							<EmojiPicker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>
				<button className={styles.buttonSend} type="submit" onClick={sendMessage} value="Send a message">
					Отправить
				</button>
			</div>
		</div>
	);
};

const SinglePost = () => {
	const params = useParams();
	const navigate = useNavigate();

	const context = useGlobalContext();
	const { colorTheme, comments, postInfo, getCommentsOfPost, getPost, userInfo, getPostsOfUserId, createNotification }: any = context;

	function toUser(id: number) {
		navigate(`/posts/${id}`);
		getPostsOfUserId(id);
	}

	useEffect(() => {
		if (params.id) {
			getPost(params.id);
			getCommentsOfPost(params.id);
		}
	}, []);

	const { backgroundColor } = useSpring({
		from: { backgroundColor: "rgba(255, 255, 255, 0)" },
		to: { backgroundColor: colorTheme },
	});

	const trails = useTrail(comments ? comments.length : 0, {
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 220,
			...config.molasses,
		},
		delay: 250,
	});

	return (
		<animated.div className={styles.wrapper} style={{ backgroundColor }}>
			<div className={styles.container}>
				{userInfo ? (
					<div
						className={styles.back}
						onClick={() => {
							if (userInfo) {
								toUser(userInfo.id);
								createNotification(`Показаны посты пользователя ${userInfo.name}`);
							}
						}}>
						Вернуться к постам {userInfo.name}
					</div>
				) : null}

				{postInfo ? (
					//
					<SinglePostInfo info={postInfo} />
				) : (
					<div className={styles.loading}>Loading...</div>
				)}

				<div className={styles.heading}>{comments ? comments.length : null} комментариев:</div>

				<div className={styles.comments}>
					{comments
						? trails.map((props, i) => (
								<animated.div style={props} key={i}>
									<Comment info={comments[i]} />
								</animated.div>
						  ))
						: "Loading..."}
				</div>
			</div>
			<EnterComment />
		</animated.div>
	);
};

export default SinglePost;
