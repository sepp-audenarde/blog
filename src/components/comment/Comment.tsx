import styles from "./Comment.module.scss";

import { firstLetterToUpperCase } from "../../utils/utils";

interface CommentProps {
	info: {
		email: string;
		body: string;
		name: string;
	};
}

const Comment = ({ info }: CommentProps) => {
	const { email, body, name } = info;
	return (
		<div className={styles.container}>
			<div className={styles.from}>От: {email}</div>
			<div className={styles.name}>{firstLetterToUpperCase(name)}</div>
			<div className={styles.body}>{firstLetterToUpperCase(body)}</div>
		</div>
	);
};

export default Comment;
