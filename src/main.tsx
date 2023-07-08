import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router basename="/blog">
		<AppProvider>
			<App />
		</AppProvider>
	</Router>,
);
