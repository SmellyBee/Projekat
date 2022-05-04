using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace QuizBack.Models
{
    [Table("Quiz")]
    public class Quiz
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        public string Name {get; set;}

        public virtual List<Question> Questions{get; set;}
    }
}