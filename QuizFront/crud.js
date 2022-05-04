import {Quiz} from "./Quiz.js" 

let i=0;

let DivQuizAdd=document.createElement("div");
DivQuizAdd.className="DivQuizAdd";
document.body.appendChild(DivQuizAdd);

let NameInput=document.createElement("input");
NameInput.className="input";
DivQuizAdd.appendChild(NameInput);

let ButtonAddQuiz=document.createElement("button");
ButtonAddQuiz.innerHTML="Add Quiz";
ButtonAddQuiz.className="submit";
DivQuizAdd.appendChild(ButtonAddQuiz);

let divQuiz=document.createElement("div");
divQuiz.className="divQuiz";
document.body.appendChild(divQuiz);


fetch("https://localhost:7245/Quiz/GetAllQuizzes").then(p=>{
    p.json().then(data=>{
        data.forEach(element => {
            let BackQuiz=new Quiz(element.name,element.id);
            BackQuiz.DrawQuizDiv(divQuiz);
            i=element.id;
        });
    });
});



ButtonAddQuiz.onclick=(ev)=>{
    i=i+1;
    let quiz=new Quiz(NameInput.value,i);
    quiz.DrawQuizDiv(divQuiz);
    
    fetch("https://localhost:7245/Quiz/AddQuiz/"+NameInput.value,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    });

    NameInput.value="";
}