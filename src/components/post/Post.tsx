import styles from "./Post.module.scss";
import { useGlobalContext } from "../../context/context";

interface PostProps {
	info: {
		title: string;
		body: string;
		id: number;
		userId: number;
	};
	toPost: (id: number) => void;
}

const Post = ({ info, toPost }: PostProps) => {
	const { createNotification, getUser }: any = useGlobalContext();

	const { title, body, id, userId } = info;

	function firstLetterToUpperCase(text: string): string {
		return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}.`;
	}

	const click = () => {
		getUser(userId);
		toPost(id);
		createNotification(`Показан пост ${firstLetterToUpperCase(title).slice(0, 10)}...`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title} onClick={click}>
				{firstLetterToUpperCase(title)}
			</div>
			<div className={styles.body}>{firstLetterToUpperCase(body)}</div>
		</div>
	);
};

export default Post;
