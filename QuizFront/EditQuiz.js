import {Quiz} from "./Quiz.js" 
import {Question} from "./Question.js" 
import {Answer} from "./Answer.js" 

let DivMain=document.createElement('div');
DivMain.className="DivMain";
document.body.appendChild(DivMain);

let DivQuestion=document.createElement('div');
DivQuestion.className="DivQuestion";
DivMain.appendChild(DivQuestion);

let DivForm=document.createElement('div');
DivForm.className="DivForm";
DivMain.appendChild(DivForm);


let QuestionLabel = document.createElement("label");
QuestionLabel.className="Label";
QuestionLabel.innerHTML="Question";
DivForm.appendChild(QuestionLabel);

let QuestionText=document.createElement("textarea");
QuestionText.className="TextArea";
DivForm.appendChild(QuestionText);

let AnswerLabel1 = document.createElement("label");
AnswerLabel1.className="Label";
AnswerLabel1.innerHTML="Answer 1";
DivForm.appendChild(AnswerLabel1);

let AnswerText1=document.createElement("textarea");
AnswerText1.className="TextArea";
DivForm.appendChild(AnswerText1);

let AnswerLabel2 = document.createElement("label");
AnswerLabel2.className="Label";
AnswerLabel2.innerHTML="Answer 2";
DivForm.appendChild(AnswerLabel2);

let AnswerText2=document.createElement("textarea");
AnswerText2.className="TextArea";
DivForm.appendChild(AnswerText2);

let AnswerLabel3 = document.createElement("label");
AnswerLabel3.className="Label";
AnswerLabel3.innerHTML="Answer 3";
DivForm.appendChild(AnswerLabel3);

let AnswerText3=document.createElement("textarea");
AnswerText3.className="TextArea";
DivForm.appendChild(AnswerText3);

let AnswerLabel4 = document.createElement("label");
AnswerLabel4.className="Label";
AnswerLabel4.innerHTML="Answer 4";
DivForm.appendChild(AnswerLabel4);

let AnswerText4=document.createElement("textarea");
AnswerText4.className="TextArea";
DivForm.appendChild(AnswerText4);

let DivButtons=document.createElement('div');
DivButtons.className="DivButtons";
DivForm.appendChild(DivButtons);

let ChooseLabel = document.createElement("label");
ChooseLabel.className="label";
ChooseLabel.innerHTML="Choose right answer";
DivButtons.appendChild(ChooseLabel);

let RightAnswar=document.createElement("select");
RightAnswar.className="RightAnswer";
DivButtons.appendChild(RightAnswar);

for(var j=0;j<4;j++)
{
    let RightOption=document.createElement('option');
    RightOption.innerHTML="Answer "+(j+1);
    RightAnswar.appendChild(RightOption);
}

let AddButton = document.createElement("button");
AddButton.className="button";
AddButton.innerHTML="Add qusetion";
DivForm.appendChild(AddButton);

let DeleteButton = document.createElement("button");
DeleteButton.className="button";
DeleteButton.innerHTML="Delete qusetion";
DivForm.appendChild(DeleteButton);


let Quizid=localStorage.getItem("IdQuiz");
let quiz=new Quiz("",0);

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

                quiz.AddQusetion(question,DivQuestion,QuestionText,AddButton,DeleteButton,AnswerText1,AnswerText2,AnswerText3,AnswerText4);

                });
            });
        });
    });
});


AddButton.onclick=(ev)=>{

    let provera=0;

    if(QuestionText.value!='')
    {
        provera++;
    }
    if(AnswerText1.value!='')
    {
        provera++;
    }
    if(AnswerText2.value!='')
    {
        provera++;
    }
    if(AnswerText3.value!='')
    {
        provera++;
    }
    if(AnswerText4.value!='')
    {
        provera++;
    }

    if(provera==5)
    {
        if(AddButton.innerHTML=="Update question")
        {
            quiz.UpdateAnswersInQuestion(QuestionText.value,AnswerText1.value,AnswerText2.value,AnswerText3.value,
                AnswerText4.value,RightAnswar);

            AddButton.innerHTML="Add qusetion";
            QuestionText.value="";
            AnswerText1.value="";
            AnswerText2.value="";
            AnswerText3.value="";
            AnswerText4.value="";
        }
        else
        {
        let newQuestion=new Question(QuestionText.value,0);
        let A1=new Answer(AnswerText1.value,false,0);
        let A2=new Answer(AnswerText2.value,false,0);
        let A3=new Answer(AnswerText3.value,false,0);
        let A4=new Answer(AnswerText4.value,false,0);

        if(RightAnswar.value=='Answer 1')
        {
            A1.status=true;
        }
        if(RightAnswar.value=='Answer 2')
        {
            A2.status=true;
        }
        if(RightAnswar.value=='Answer 3')
        {
            A3.status=true;
        }
        if(RightAnswar.value=='Answer 4')
        {
            A4.status=true;
        }

        newQuestion.AddAnswer(A1);
        newQuestion.AddAnswer(A2);
        newQuestion.AddAnswer(A3);
        newQuestion.AddAnswer(A4);

        quiz.StoreQuestionInDB(newQuestion);
        newQuestion.id=quiz.idQuest;
        quiz.AddQusetion(newQuestion,DivQuestion,QuestionText,AddButton,DeleteButton,AnswerText1,AnswerText2,AnswerText3,AnswerText4);

            QuestionText.value="";
            AnswerText1.value="";
            AnswerText2.value="";
            AnswerText3.value="";
            AnswerText4.value="";
        }
       
    }
    else{ alert("Neuspesno sva polja moraju biti popunjena");}
}
