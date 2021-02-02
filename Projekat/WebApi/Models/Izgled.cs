using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace WebApi.Models
{
    [Table("Izgled")]
    public class Izgled
    {
        [Key]
        [Column("ID")]
        public int iD{get;set;}

        
        public virtual List<Film> Filmovi { get; set; }

    }
}