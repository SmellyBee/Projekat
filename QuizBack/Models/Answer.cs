using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizBack.Models
{
    [Table("Answer")]
    public class Answer
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        public string Name {get; set;}

        [Column("Status")]
        public bool Status {get; set;}

        public Question Question {get; set;}
        
    }
}