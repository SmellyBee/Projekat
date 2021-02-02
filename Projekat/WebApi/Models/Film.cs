using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace WebApi.Models
{
    [Table("Film")]
    public class Film
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        
        [Column("Ime")]
        public string Ime { get; set; }

        [Column("Reziser")]
        public  string Reziser { get; set; }

        [Column("Godina")]
        public int Godina { get; set; }

        [Column("Ocena")]
        public int Ocena { get; set; }

        public virtual List<Kategorija> Kategorije{get; set;}

        [Column("Slika")]
        public string Slika { get; set; }

        [JsonIgnore]
        public Izgled Izgled{get; set;}
    }
}