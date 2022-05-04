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
public class QuestionController : ControllerBase
{
    public QuizContext Context {get; set;}
    public QuestionController(QuizContext quizContext)
    {
        Context=quizContext;
    }

    [Route("AddQuestion/{question}/{idQuiz}")]
    [HttpPost]
    public async Task AddQuestion(string question,int idQuiz)
    {
        var quiz=await Context.Quizzes.FindAsync(idQuiz);
        Question q=new Question{Name=question , Quiz=quiz};
        Context.Questions.Add(q);
        quiz.Questions.Add(q);
        Context.Update<Quiz>(quiz);
        await Context.SaveChangesAsync();
    }

    [Route("GetAllQuestions/{idQuiz}")]
    [HttpGet]
    public async Task<List<Question>> GetAllQuestions(int idQuiz)
    {
        var question=Context.Questions.Where(q=>q.Quiz.ID==idQuiz).ToListAsync();
        return await question;

    }

    [Route("DeleteQusetion/{idQuestion}")]
    [HttpDelete]
    public async Task DeleteQuestion(int idQuestion)
    {
        var an =Context.Answers.Where(a=>a.Question.ID==idQuestion).ToList();
        foreach(var element in an)
        {
            Context.Remove<Answer>(element);
        }
        var question= await Context.Questions.FindAsync(idQuestion);
        Context.Remove<Question>(question);
        await Context.SaveChangesAsync();
    }
}
