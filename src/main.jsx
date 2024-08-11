import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Questions from "./pages/Questions";
import StyleSelector from "./pages/StyleSelector";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/explore",
		element: <Explore />,
	},
	{
		path: "/questions",
		element: <Questions />,
	},
	{
		path: "/styleselector",
		element: <StyleSelector />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
