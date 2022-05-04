using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizBack.Models
{
    [Table("Question")]
    public class Question
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        public string Name {get; set;}

        public virtual List<Answer> Answers {get; set;}

        public Quiz Quiz {get; set;}
    }
}