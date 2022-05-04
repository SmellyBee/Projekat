import {Quiz} from "./Quiz.js" 
import {Question} from "./Question.js" 
import {Answer} from "./Answer.js" 

let Quizid=localStorage.getItem("IdQuiz");
let quiz=new Quiz("",Quizid);
let i=-1;

            let DivQuestion =document.createElement('div');
            DivQuestion.className="DivQuestion";
            document.body.appendChild(DivQuestion);


            let SectionQuestion =document.createElement('div');
            DivQuestion.className="SectionQuestion";
            DivQuestion.appendChild(SectionQuestion);

            let QuestionText=document.createElement('p');
            QuestionText.className="QuestionText";
            SectionQuestion.appendChild(QuestionText);

            let AnswerButton1=document.createElement('button');
            AnswerButton1.className="buttons";
            document.body.appendChild(AnswerButton1);

            let AnswerButton2=document.createElement('button');
            AnswerButton2.className="buttons";
            document.body.appendChild(AnswerButton2);

            let AnswerButton3=document.createElement('button');
            AnswerButton3.className="buttons";
            document.body.appendChild(AnswerButton3);

            let AnswerButton4=document.createElement('button');
            AnswerButton4.className="buttons";
            document.body.appendChild(AnswerButton4);

            fetch("https://localhost:7245/Quiz/GetQuiz/"+Quizid).then(p=>{
                p.json().then(data=>{
            
                    quiz.ime=data.name;
                    quiz.id=data.id;
            
                    fetch("https://localhost:7245/Question/GetAllQuestions/"+Quizid).then(q=>{
                        q.json().then(d=>{
                            d.forEach(element => {
                                let question=new Question(element.name,element.id);
            
                                fetch("https://localhost:7245/Answer/GetAllAnswers/"+element.id).then(p=>{
                                    p.json().then(data=>{
                                        data.forEach(element => {
                                            let answer=new Answer(element.name,element.status,element.id);
                                            question.AddAnswer(answer);
                                        });
                                    });
                                });    
                            quiz.Add(question);
                            });
                        });
                    });
                });
            });

const myTimeout = setTimeout(nextQuestion, 500);

function nextQuestion()
{
    i++;
    QuestionText.innerHTML=quiz.ListQuestions[i].name;
    AnswerButton1.innerHTML=quiz.ListQuestions[i].ListAnswers[0].name
    AnswerButton2.innerHTML=quiz.ListQuestions[i].ListAnswers[1].name;
    AnswerButton3.innerHTML=quiz.ListQuestions[i].ListAnswers[2].name;
    AnswerButton4.innerHTML=quiz.ListQuestions[i].ListAnswers[3].name;

    AnswerButton1.className="buttons";
    AnswerButton2.className="buttons";
    AnswerButton3.className="buttons";
    AnswerButton4.className="buttons";
}

AnswerButton1.onclick=(ev)=>{
    if(quiz.ListQuestions[i].ListAnswers[0].status==true)
    {
       AnswerButton1.className="rb";
    }
    else
    {
    AnswerButton1.className="fb";
    }
    myTimeout = setTimeout(nextQuestion, 2000);
}

AnswerButton2.onclick=(ev)=>{
    if(quiz.ListQuestions[i].ListAnswers[1].status==true)
    {
       AnswerButton2.className="rb";
    }
    else
    {
    AnswerButton2.className="fb";
    }
    myTimeout = setTimeout(nextQuestion, 2000);
} 

AnswerButton3.onclick=(ev)=>{
    if(quiz.ListQuestions[i].ListAnswers[2].status==true)
    {
       AnswerButton3.className="rb";
    }
    else
    {
    AnswerButton3.className="fb";
    }
    myTimeout = setTimeout(nextQuestion, 2000);
} 

AnswerButton4.onclick=(ev)=>{
    if(quiz.ListQuestions[i].ListAnswers[3].status==true)
    {
       AnswerButton4.className="rb";
    }
    else
    {
    AnswerButton4.className="fb";
    }
    myTimeout = setTimeout(nextQuestion, 2000);
} 