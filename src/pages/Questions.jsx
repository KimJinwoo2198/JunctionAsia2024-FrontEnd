import { useState } from "react"
import Footer from "../components/Footer"
import QuestionCard, { info } from "../components/QuestionCard"
import CommentCard from "../components/Comment"

export default function Questions() {
    const [detail, setDetail] = useState(null)
    const [contentId, setContentId] = useState(false)
    return <main className="h-dvh overflow-hidden mx-5">
        <div className="h-[calc(100dvh-80px)] overflow-y-scroll">
            <Q setContentId={setContentId} setDetail={setDetail} />
            <A setDetail={setDetail} contentId={contentId} detail={detail} />
        </div>
        <Footer />
    </main>
}


const Q = ({ setContentId, setDetail }) => {
    return <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-bold">질문답변</h1>
        <div className="flex flex-col gap-3">
            <QuestionCard contentId="2" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
            <QuestionCard contentId="1" setDetail={setDetail} setContentId={setContentId} />
        </div>
    </div>

}
const A = ({ contentId, detail, setDetail }) => {
    if (!contentId)
        return <div className={`overflow-visible fixed top-0 left-0 w-dvw h-dvh p-5 flex-col gap-4 bg-white transition-all duration-700 ${detail ? 'translate-x-0' : 'translate-x-full'}`}></div>

    let content = info[contentId];
    return <div className={`overflow-visible fixed top-0 left-0 w-dvw h-dvh p-5 flex-col gap-4 bg-white transition-all duration-700 ${detail ? 'translate-x-0' : 'translate-x-full'}`}>
        <p className="text-subtext" onClick={() => setDetail(false)}>{"< "}뒤로가기</p>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <h1 className="text-xl font-bold">{content.title}</h1>
                <p className="text-sm text-subtext">{content.time}전</p>
            </div>
            <h2>{content.description}</h2>
        </div>
        <div className="w-dvw translate-x-[-20px] h-3 bg-box my-14"></div>
        <CommentCard/>
    </div>

}