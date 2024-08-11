import { useBlocker } from "react-router-dom";

import Footer from "../components/Footer";
import Card from "../components/Card";
import Kid from "../assets/kid.svg";
import ArrowRight from "../assets/arrow_right.svg";
import ChattingBubble from "../assets/chatting_bubble.svg";

export default function Home() {
	// useBlocker(({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname);

	return (
		<main className="flex flex-col mx-5 mt-10 mb-28">
			<div className="flex flex-col gap-10">
				<Card className="flex flex-col gap-2">
					<div className="flex w-full content-between">
						<div className="flex gap-2 items-center w-full">
							<img src={Kid} alt="아이 이모지" />
							<div className="flex flex-col">
								<span className="text-xs text-subtext">출산까지</span>
								<span className="text-primary font-bold">D - 130</span>
							</div>
						</div>
						<img src={ArrowRight} alt="오른쪽 화살표" />
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-subtext">아이 이름</span>
						<div className="relative flex-grow h-2 bg-gray-200 rounded">
							<div className="absolute top-0 left-0 h-full bg-primary rounded" style={{ width: "50%" }}></div>
						</div>
						<span className="text-xs text-subtext">50%</span>
					</div>
				</Card>

				<div className="flex flex-col gap-4">
					<div className="flex justify-between">
						<span className="text-xl font-semibold">질문답변</span>
						<span className="text-subtext">더보기</span>
					</div>

					<div className="flex flex-col gap-3">
						<Card>
							<span className="font-semibold">아이 달래기</span>
							<div className="flex justify-between w-full text-sm">
								<span className="text-subtext">대충 물어보는글</span>
								<div className="flex gap-1">
									<img src={ChattingBubble} alt="채팅 버블 이모지" />
									<span>100</span>
								</div>
							</div>
						</Card>
						<Card>
							<span className="font-semibold">아이 달래기</span>
							<div className="flex justify-between w-full text-sm">
								<span className="text-subtext">대충 물어보는글</span>
								<div className="flex gap-1">
									<img src={ChattingBubble} alt="채팅 버블 이모지" />
									<span>100</span>
								</div>
							</div>
						</Card>
						<Card>
							<span className="font-semibold">아이 달래기</span>
							<div className="flex justify-between w-full text-sm">
								<span className="text-subtext">대충 물어보는글</span>
								<div className="flex gap-1">
									<img src={ChattingBubble} alt="채팅 버블 이모지" />
									<span>100</span>
								</div>
							</div>
						</Card>
						<Card>
							<span className="font-semibold">아이 달래기</span>
							<div className="flex justify-between w-full text-sm">
								<span className="text-subtext">대충 물어보는글</span>
								<div className="flex gap-1">
									<img src={ChattingBubble} alt="채팅 버블 이모지" />
									<span>100</span>
								</div>
							</div>
						</Card>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<span className="text-xl font-semibold">추천 식단</span>

					<div className="flex overflow-x-scroll gap-3">
						<Card className="min-w-36">
							<span>아침</span>
							<ul>
								<li>김치찌개</li>
								<li>김치전</li>
								<li>김치국</li>
								<li>김치무침</li>
								<li>김치절임</li>
							</ul>
						</Card>
						<Card className="min-w-36">
							<span>점심</span>
							<ul>
								<li>김치찌개</li>
								<li>김치전</li>
								<li>김치국</li>
								<li>김치무침</li>
								<li>김치절임</li>
							</ul>
						</Card>
						<Card className="min-w-36">
							<span>저녁</span>
							<ul>
								<li>김치찌개</li>
								<li>김치전</li>
								<li>김치국</li>
								<li>김치무침</li>
								<li>김치절임</li>
							</ul>
						</Card>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
