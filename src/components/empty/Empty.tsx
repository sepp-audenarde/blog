import { useEffect } from "react";
import styles from "./Empty.module.scss";
import { useNavigate } from "react-router-dom";

const Empty = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/posts");
	}, []);

	return <div className={styles.container}>Empty</div>;
};

export default Empty;
