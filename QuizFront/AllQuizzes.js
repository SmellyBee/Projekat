import {Quiz} from "./Quiz.js" 

let divQuiz=document.createElement("div");
divQuiz.className="divQuiz";
document.body.appendChild(divQuiz);


fetch("https://localhost:7245/Quiz/GetAllQuizzes").then(p=>{
    p.json().then(data=>{
        data.forEach(element => {
            let BackQuiz=new Quiz(element.name,element.id);
            BackQuiz.DrawQuizDivForPlay(divQuiz);
        });
    });
});

