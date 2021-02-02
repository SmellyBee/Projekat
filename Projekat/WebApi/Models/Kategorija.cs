using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace WebApi.Models
{
    [Table("Kategorije")]
    public class Kategorija
    {
        [Key]
        [Column("IDKategorije")]
        public int IDKategorije { get; set; }
        [Column("ImeKategorije")]
        public string ImeKategorije { get; set; }
        [JsonIgnore]
        public Film Film{get; set;}

    }
}