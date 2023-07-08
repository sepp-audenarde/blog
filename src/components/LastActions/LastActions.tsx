import { useEffect, useRef } from "react";
import styles from "./LastActions.module.scss";
import { useGlobalContext } from "../../context/context";
import { animated, useSpring, useTransition } from "@react-spring/web";

type Notification = {
	title: string;
	body: string;
	date: string;
	id: string;
};

interface SingleActionProps {
	info: Notification;
	deleteNotification: (id: string) => void;
}

const SingleAction = ({ info, deleteNotification }: SingleActionProps) => {
	const { title, body, date, id } = info;

	return (
		<div className={styles.action}>
			<div className={styles.top}>
				<div className={styles.title}>{title}</div>
				<div className={styles.date}>{date}</div>
			</div>

			<div className={styles.bottom}>
				<div className={styles.body}>{body}</div>
				<div className={styles.delete} onClick={() => deleteNotification(id)}>
					удалить
				</div>
			</div>
		</div>
	);
};

const LastActions = () => {
	const { setLastActions, lastActions, colorTheme }: any = useGlobalContext();

	const el = useRef<HTMLDivElement | null>(null!);

	useEffect(() => {
		if (el && el.current)
			el.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
	}, [lastActions]);

	const transitions = useTransition(lastActions, {
		from: { height: 0, opacity: 0 },
		enter: { height: 80, opacity: 1, delay: 500 },
		leave: { height: 0, opacity: 0 },
		exitBeforeEnter: false,
	});

	function deleteNotification(id: string): void {
		setLastActions((prev: Notification[]) => prev.filter((e) => e.id !== id));
	}

	const { backgroundColor } = useSpring({
		from: { backgroundColor: "rgba(255, 255, 255, 0)" },
		to: { backgroundColor: colorTheme },
	});

	return (
		<animated.div className={styles.container} ref={el} style={{ backgroundColor }}>
			{lastActions.length ? (
				transitions((style, item) => {
					return (
						<animated.div key={item.id} style={style}>
							<SingleAction info={item} deleteNotification={deleteNotification} />
						</animated.div>
					);
				})
			) : (
				<div className={styles.noNots}>Нет уведомлений</div>
			)}
		</animated.div>
	);
};

export default LastActions;
