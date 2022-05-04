import {Quiz} from "./Quiz.js" 
export class Question
{
    constructor(name,id)
    {
        this.id=id;
        this.name=name;
        this.ListAnswers=[];
    }

    AddAnswer(a)
    {
        this.ListAnswers.push(a);
    }

    GetName()
    {
        return this.name;
    }

    UpdateAnswers(a1,a2,a3,a4,ra)
    {
        if(ra.value=='Answer 1')
        {
            this.ListAnswers[0].status=true;
        }
        if(ra.value=='Answer 2')
        {
            this.ListAnswers[1].status=true;
        }
        if(ra.value=='Answer 3')
        {
            this.ListAnswers[2].status=true;
        }
        if(ra.value=='Answer 4')
        {
            this.ListAnswers[3].status=true;
        }

        if(this.ListAnswers[0].name!=a1)
        {
            this.ListAnswers[0].name=a1;
            fetch("https://localhost:7245/Answer/UpdateAnswer/"+this.ListAnswers[0].id+"/"+this.ListAnswers[0].name+"/"
            +this.ListAnswers[0].status,{
                method: 'PUT',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
            });
        }
        if(this.ListAnswers[1].name!=a2)
        {
            this.ListAnswers[1].name=a2;
            fetch("https://localhost:7245/Answer/UpdateAnswer/"+this.ListAnswers[1].id+"/"+this.ListAnswers[1].name+"/"
            +this.ListAnswers[1].status,{
                method: 'PUT',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
            });
        }
        if(this.ListAnswers[2].name!=a3)
        {
            this.ListAnswers[2].name=a3;
            fetch("https://localhost:7245/Answer/UpdateAnswer/"+this.ListAnswers[2].id+"/"+this.ListAnswers[2].name+"/"
            +this.ListAnswers[2].status,{
                method: 'PUT',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
            });
        }
        if(this.ListAnswers[3].name!=a4)
        {
            this.ListAnswers[3].name=a4;
            fetch("https://localhost:7245/Answer/UpdateAnswer/"+this.ListAnswers[3].id+"/"+this.ListAnswers[3].name+"/"
            +this.ListAnswers[3].status,{
                method: 'PUT',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
            });
        }
    }

}