import styles from "./User.module.scss";
import { useGlobalContext } from "../../context/context";

interface UserProps {
	info: {
		name: string;
		username: string;
	};
	index: number;
	toUser: (index:number) => void;
}

const User = ({ info, index, toUser }: UserProps) => {
	const image = `/images/user_avatar${index}.png`;
	const { createNotification }: any = useGlobalContext();

	const click = () => {
		toUser(index);
		createNotification(`Показаны посты пользователя ${info.name}`);
	};

	return (
		<div className={styles.user} onClick={click}>
			<div className={styles.image}>
				<img draggable={false} src={image} alt="avatar" />
			</div>
			<div className={styles.info}>
				<div className={styles.name}>{info.name}</div>
				<div className={styles.username}>{info.username}</div>
			</div>
		</div>
	);
};

export default User;
