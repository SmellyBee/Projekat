import {Question} from "./Question.js"
import {Answer} from "./Answer.js"  
export class Quiz
{
    constructor(ime,id)
    {
        this.id=id;
        this.ime=ime;
        this.ListQuestions=[];
        this.i=0;
        this.idQuest=0;
    }

    AddQusetion(q,draw,QuestionText,AddButton,DeleteButton,AnswerText1,AnswerText2,AnswerText3,AnswerText4)
    {
        this.ListQuestions.push(q);
        this.idQuest=q.id;

        let Question=document.createElement('p');
        Question.innerHTML=q.name;
        Question.className="Question";
        draw.appendChild(Question);

        var inQuestion = document.getElementsByClassName('Question')[this.i++];
        document.addEventListener('click', function( event ) {
        if (inQuestion == event.target && inQuestion.contains(event.target)) {    
        
        QuestionText.value=inQuestion.innerHTML;

        AddButton.innerHTML="Update question";

        AnswerText1.value=q.ListAnswers[0].name;
        AnswerText2.value=q.ListAnswers[1].name;
        AnswerText3.value=q.ListAnswers[2].name;
        AnswerText4.value=q.ListAnswers[3].name;

        DeleteButton.onclick=(ev)=>{

            fetch("https://localhost:7245/Question/DeleteQusetion/"+q.id,{
                method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
            }).then(p=>{
                if(p.status==200)
                {
                    QuestionText.value="";
                    AnswerText1.value="";
                    AnswerText2.value="";
                    AnswerText3.value="";
                    AnswerText4.value="";
                    Question.remove(); 
                }
            });
        }
        
        }
        });
    }

    DrawQuizDiv(quiz)
    {
       let Kviz=document.createElement("div");
       Kviz.className="divKviz";
       quiz.appendChild(Kviz);

       let NameQuiz=document.createElement("label");
       NameQuiz.innerHTML=this.ime;
       NameQuiz.className="labela";
       Kviz.appendChild(NameQuiz);

       let GoInQuizButton=document.createElement("button");
       GoInQuizButton.className="join";
       GoInQuizButton.innerHTML="Join";
       Kviz.appendChild(GoInQuizButton);

       GoInQuizButton.onclick=(ev)=>{
           localStorage.setItem("IdQuiz",this.id);
           window.open('EditQuiz.html');
       }
    }


    StoreQuestionInDB(newQuestion)
    {
        fetch("https://localhost:7245/Question/AddQuestion/"+newQuestion.name+"/"+this.id,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        }
        }).then(p=>{
            if(p.status==200)
            {
                fetch("https://localhost:7245/Question/GetAllQuestions/"+this.id).then(q=>{
                q.json().then(d=>{
                  d.forEach(element => {
                    this.idQuest=element.id;
                  });
               });
               });
               this.idQuest=this.idQuest+1;
               
                newQuestion.ListAnswers.forEach(element => {

                    fetch("https://localhost:7245/Answer/AddAnswer/"+element.name+"/"+element.status+"/"+this.idQuest,{
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        });
           
                });
                
            }
        });
    }

    UpdateAnswersInQuestion(qt,a1,a2,a3,a4,ra)
    {
        this.ListQuestions.forEach(element=>{
            if(element.name==qt)
            {
                element.UpdateAnswers(a1,a2,a3,a4,ra);
            }
        });

    }

    DrawQuizDivForPlay(quiz)
    {
       let Kviz=document.createElement("div");
       Kviz.className="divKviz";
       quiz.appendChild(Kviz);

       let NameQuiz=document.createElement("label");
       NameQuiz.innerHTML=this.ime;
       NameQuiz.className="labela";
       Kviz.appendChild(NameQuiz);

       let GoInQuizButton=document.createElement("button");
       GoInQuizButton.className="join";
       GoInQuizButton.innerHTML="Play";
       Kviz.appendChild(GoInQuizButton);

       GoInQuizButton.onclick=(ev)=>{
        localStorage.setItem("IdQuiz",this.id);
        window.open('PlayQuiz.html');
       }
    }

    Add(q)
    {
        this.ListQuestions.push(q);
    }
}