import styles from "./Drag.module.scss";
import icon from "/images/menu-bar.png";

interface DragProps {
	bind: () => {};
	toBase: () => void;
}

const Drag = ({ bind, toBase }: DragProps) => {
	return (
		<div
			className={styles.container}
			{...bind()}
			onDoubleClick={() => toBase()}
			style={{ touchAction: "none" }}
			//
		>
			<img draggable={false} src={icon} alt="" />
		</div>
	);
};

export default Drag;
