import styles from "./Center.module.scss";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";

const Center = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();

	const { colorTheme, getAllPosts, setUserInfo, createNotification }: any = useGlobalContext();

	const toMain = () => {
		setUserInfo(null!);
		navigate("/posts");
		getAllPosts();
		createNotification(`Показаны все посты`);
	};

	const { backgroundColor } = useSpring({
		from: { backgroundColor: "rgba(255, 255, 255, 0)" },
		to: { backgroundColor: colorTheme },
	});

	return (
		<animated.div className={styles.container} style={{ backgroundColor }}>
			<div className={styles.top}>
				<button className={styles.buttonMain} onClick={toMain}>
					На главную
				</button>
			</div>
			{children}
		</animated.div>
	);
};

export default Center;
