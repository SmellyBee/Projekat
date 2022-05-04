using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using QuizBack.Models;
namespace QuizBack.Controllers;

[ApiController]
[Route("[controller]")]
public class AnswerController : ControllerBase
{
    public QuizContext Context {get; set;}
    public AnswerController(QuizContext quizContext)
    {
        Context=quizContext;
    }

    [Route("AddAnswer/{answer}/{status}/{idQuestion}")]
    [HttpPost]
    public async Task AddAnswer(string answer,bool status,int idQuestion)
    {
        var question=await Context.Questions.FindAsync(idQuestion);
        Answer a=new Answer{Name=answer,Status=status,Question=question};
        Context.Answers.Add(a);
        question.Answers.Add(a);
        Context.Update<Question>(question);
        await Context.SaveChangesAsync();
    }

    [Route("GetAllAnswers/{idQuestion}")]
    [HttpGet]
    public async Task<List<Answer>> GetAllAnswers(int idQuestion)
    {
        var answer=Context.Answers.Where(q=>q.Question.ID==idQuestion).ToListAsync();
        return await answer;
    }

    [Route("UpdateAnswer/{idAnswer}/{answer}/{stat}")]
    [HttpPut]
    public async Task UpdateAnswer(int idAnswer,string answer,bool stat)
    {
        var answerQuery=await Context.Answers.FindAsync(idAnswer);
        answerQuery.Name=answer;
        answerQuery.Status=stat;
        Context.Update<Answer>(answerQuery);
        await Context.SaveChangesAsync();
    }
}