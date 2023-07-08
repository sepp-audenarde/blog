import styles from "./Personal.module.scss";
import UserInfo from "../userinfo/UserInfo";
import LastActions from "../LastActions/LastActions";

const Personal = () => {
	return (
		<div className={styles.container}>
			<UserInfo />
			<LastActions />
		</div>
	);
};

export default Personal;
