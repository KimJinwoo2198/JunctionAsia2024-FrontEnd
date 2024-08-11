import React from "react";

// const info = {
//     "1": {
//         time: "10분",
//         title: "i use arch btw",
//         description: "ny64 is fury ny64 is fury ny64 is fury ny64 is fury ny64 is fury ny64 is fury",
//         comments: 100
//     },

//     "2": {
//         time: "20분",
//         title: "질문질문질문질문질문질문질문질문",
//         description: "대충 물어보는글대충 물어보는글대충 물어보는글대충 물어보는글대충 물어보는글대충 물어보는글물어보는글",
//         comments: 19
//     }
// }

export default function CommentCard() {
    // let content = info[commentId];
    
    return <article className="flex flex-col items-start px-4 py-3 gap-1">
        <div className="flex flex-col gap-1">
            <p className="text-sm text-subtext">10분전</p>
            <p>대충 엄청난 답변글대충 엄청난 답변글대충 엄청난 답변글대충 엄청난 답변글대충 엄청난 답변글대충 엄청난 답변글</p>
        </div>
    </article>
}