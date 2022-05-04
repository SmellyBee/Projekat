using Microsoft.EntityFrameworkCore;

namespace QuizBack.Models
{
    public class QuizContext:DbContext
    {
        public DbSet<Quiz> Quizzes{get; set;}
        public DbSet<Question> Questions {get; set;}
        public DbSet<Answer> Answers {get; set;}

        public QuizContext(DbContextOptions  options):base(options)
      {

      }
    }
}