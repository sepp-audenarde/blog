import styles from "./UserInfo.module.scss";
import { useGlobalContext } from "../../context/context";
import { reverseName } from "../../utils/utils";
import { useSpring, animated } from "@react-spring/web";

const BrightСolors = () => {
	const array = ["rgba(255, 255, 255, 1)", "rgba(242,242,242, 1)", "rgba(235,213,213, 1)", "rgba(234,138,138, 1)", "rgba(176,125,125, 1)"];

	const arrayThemes = [
		"rgba(255, 255, 255, 1)",
		"rgba(235,235,235, .5)",
		"rgba(235,213,213, .5)",
		"rgba(234,138,138, .5)",
		"rgba(176,125,125, .5)",
	];

	const { setColorTheme, createNotification }: any = useGlobalContext();

	return (
		<div className={styles.palette}>
			<div className={styles.colorName}>Цветовая тема приложения</div>
			<div className={styles.list}>
				{array.map((e, i) => (
					<div
						className={styles.round}
						key={i}
						style={{ backgroundColor: e }}
						onClick={() => {
							setColorTheme(arrayThemes[i]);
							createNotification(i === 0 ? `Установлена стандартная тема` : `Изменена цветовая тема `);
						}}></div>
				))}
			</div>
		</div>
	);
};

const UserInfo = () => {
	const { userInfo, colorTheme }: any = useGlobalContext();

	const props = useSpring({
		from: { height: 100 },
		to: { height: userInfo ? 300 : 100 },
	});

	const { backgroundColor } = useSpring({
		from: { backgroundColor: "rgba(255, 255, 255, 0)" },
		to: { backgroundColor: colorTheme },
	});

	return (
		<animated.div className={styles.container} style={{ backgroundColor }}>
			<div className={styles.top}>{userInfo ? reverseName(userInfo.name) : null}</div>
			<animated.div style={{ ...props }} className={styles.middle}>
				<div className={styles.photo}>
					{userInfo ? <img draggable={false} src={`/images/user_avatar${userInfo.id}.png`} alt="" /> : null}
				</div>
				<div className={styles.name}>{userInfo ? userInfo.name : ""}</div>
				<div className={styles.usernick}>{userInfo ? userInfo.username : ""}</div>
				<div className={styles.email}>{userInfo ? "Email: " + userInfo.email : ""}</div>
			</animated.div>
			<BrightСolors />
		</animated.div>
	);
};

export default UserInfo;
