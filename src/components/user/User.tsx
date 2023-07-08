import styles from "./User.module.scss";
import { useGlobalContext } from "../../context/context";
import { avatars } from "../../avatars";

interface UserProps {
	info: {
		name: string;
		username: string;
	};
	index: number;
	toUser: (index: number) => void;
}

const User = ({ info, index, toUser }: UserProps) => {
	const { createNotification }: any = useGlobalContext();

	const click = () => {
		toUser(index + 1);
		createNotification(`Показаны посты пользователя ${info.name}`);
	};

	return (
		<div className={styles.user} onClick={click}>
			<div className={styles.image}>
				<img draggable={false} src={avatars[index]} alt="avatar" />
			</div>
			<div className={styles.info}>
				<div className={styles.name}>{info.name}</div>
				<div className={styles.username}>{info.username}</div>
			</div>
		</div>
	);
};

export default User;
