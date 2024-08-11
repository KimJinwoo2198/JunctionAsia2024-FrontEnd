import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";

import PregnantWoman from "./assets/pregnant_woman.svg";
import DatePicker from "./components/DatePicker";
import Button from "./components/Button";
import "./App.css";

export default function App() {
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);

	const navigate = useNavigate();

	async function greet() {
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<main className="flex justify-center items-center h-dvh w-dvw">
			<div className="flex justify-center flex-col items-center gap-12 w-full mx-14">
				<div className="flex justify-centwer flex-col items-center gap-8">
					<span className="text-2xl font-semibold">출산 예정일이 언제인가요?</span>
					<img src={PregnantWoman} alt="임신한 여자 이모지" width={178} height={178} />
				</div>
				<DatePicker
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
				/>
				<Button className="w-full" onClick={() => navigate("/home")} disabled={!selectedYear || !selectedMonth || !selectedDay}>
					계속하기
				</Button>
			</div>
		</main>
	);
}
