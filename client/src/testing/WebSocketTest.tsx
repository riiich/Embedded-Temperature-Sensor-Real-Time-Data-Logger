import { useState, useEffect } from "react";

const WebSocketTest = () => {
	const [message, setMessage] = useState("");
	const [wsData, setWSData] = useState([]);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket("ws://127.0.0.1:8000/ws/aviation-logger/");

		ws.onopen = () => {
			console.log("Websocket connection established");
			ws.send(
				JSON.stringify({
					msg: "Connection from client-side =)",
				})
			);
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				console.log("Message from server:", data);
				setMessage(data.msg);
			} catch (error) {
				console.error("Error parsing message:", error);
			}
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};

		setSocket(ws);

		// Clean up on component unmount
		return () => {
			ws.close();
		};
	}, []);

	return (
		<div className="text-center m-10">
			<h1 className="text-4xl font-medium">WebSocketTest</h1>

			<p className="m-5">{message.length > 0 ? message : "Nothing"}</p>
		</div>
	);
};

export default WebSocketTest;
