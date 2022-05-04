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
public class QuizController : ControllerBase
{
    public QuizContext Context {get; set;}
    public QuizController(QuizContext quizContext)
    {
        Context=quizContext;
    }

    [Route("GetAllQuizzes")]
    [HttpGet]
    public async Task<List<Quiz>> GetAllQuizzes()
    {
        return await Context.Quizzes.ToListAsync();
    }

    [Route("AddQuiz/{name}")]
    [HttpPost]
    public async Task AddQuiz(string name)
    {
        Quiz quiz=new Quiz{Name=name};
        Context.Quizzes.Add(quiz);
        await Context.SaveChangesAsync();
    }

    [Route("GetQuiz/{id}")]
    [HttpGet]
    public async Task<Quiz> GetQuiz(int id)
    {
        var quiz=await Context.Quizzes.FindAsync(id);
        return  quiz;
    }
    
}