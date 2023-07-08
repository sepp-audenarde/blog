import { useEffect } from "react";
import styles from "./Users.module.scss";
import User from "../user/User";
import logo from "/images/logotype.png";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

import { useSpring, animated } from "@react-spring/web";

interface UserProps {
	users: {
		name: string;
		username: string;
	}[];
}

const Users = ({ users }: UserProps) => {
	const navigate = useNavigate();
	const { getPostsOfUserId, colorTheme, getAllUsers }: any = useGlobalContext();

	function toUser(id: number) {
		navigate(`/posts/${id}`);
		getPostsOfUserId(id);
	}

	useEffect(() => {
		getAllUsers();
	}, []);

	const { backgroundColor } = useSpring({
		from: { backgroundColor: "rgba(255, 255, 255, 0)" },
		to: { backgroundColor: colorTheme },
	});

	return (
		<animated.div className={styles.container} style={{ backgroundColor }}>
			<div className={styles.top}>
				<img draggable={false} src={logo} alt="logo" />
				<p className={styles.logotext}>Список пользователей:</p>
			</div>
			<div className={styles.users}>
				{users
					? users.map((e, i) => {
							return <User key={i} info={e} index={i} toUser={toUser} />;
					  })
					: "Loading..."}
			</div>
		</animated.div>
	);
};

export default Users;
