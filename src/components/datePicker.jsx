import React, { useState } from "react";
import ArrowDown from "../assets/arrow_down.svg";

export default function DatePicker({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay }) {
	const [openDropdown, setOpenDropdown] = useState(null);

	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;
	const currentDay = new Date().getDate();

	const years = Array.from({ length: 2 }, (_, i) => ({
		value: currentYear + i,
		label: `${currentYear + i}년`,
	}));

	const months = Array.from({ length: 12 }, (_, i) => ({
		value: i + 1,
		label: `${i + 1}월`,
	})).filter((month) => selectedYear > currentYear || month.value >= currentMonth);

	const days = Array.from({ length: 31 }, (_, i) => ({
		value: i + 1,
		label: `${i + 1}일`,
	})).filter((day) => selectedYear > currentYear || selectedMonth > currentMonth || day.value >= currentDay);

	const handleYearChange = (year) => {
		setSelectedYear(year);
		setOpenDropdown(null);
	};

	const handleMonthChange = (month) => {
		setSelectedMonth(month);
		setOpenDropdown(null);
	};

	const handleDayChange = (day) => {
		setSelectedDay(day);
		setOpenDropdown(null);
	};

	return (
		<div className="flex justify-center items-center gap-5">
			<Select
				options={years}
				selectedOption={years.find((year) => year.value === selectedYear)}
				setSelectedOption={handleYearChange}
				showDropdown={openDropdown === "year"}
				setShowDropdown={() => setOpenDropdown(openDropdown === "year" ? null : "year")}
			/>
			<Select
				options={months}
				selectedOption={months.find((month) => month.value === selectedMonth)}
				setSelectedOption={handleMonthChange}
				showDropdown={openDropdown === "month"}
				setShowDropdown={() => setOpenDropdown(openDropdown === "month" ? null : "month")}
			/>
			<Select
				options={days}
				selectedOption={days.find((day) => day.value === selectedDay)}
				setSelectedOption={handleDayChange}
				showDropdown={openDropdown === "day"}
				setShowDropdown={() => setOpenDropdown(openDropdown === "day" ? null : "day")}
			/>
		</div>
	);
}

function Select({ options, selectedOption, setSelectedOption, showDropdown, setShowDropdown }) {
	return (
		<div className="justify-start items-center flex relative bg-box rounded-md p-2 gap-1" onClick={setShowDropdown}>
			<button className="text-sm font-semibold">{selectedOption ? selectedOption.label : "선택"}</button>
			{showDropdown && (
				<ul className="absolute left-0 top-0 z-10 mt-10 py-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[25vh] overflow-y-scroll">
					{options.map((option) => (
						<li
							key={option.value}
							className="text-sm text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 w-max"
							onClick={() => setSelectedOption(option.value)}>
							{option.label}
						</li>
					))}
				</ul>
			)}
			<img src={ArrowDown} alt="화살표 아이콘" className="w-4 h-4" />
		</div>
	);
}
