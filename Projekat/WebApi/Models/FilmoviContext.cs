using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
    
    public class FilmoviContext:DbContext
    {
       public DbSet<Izgled> Izgledi{get; set;}
       public DbSet<Film> Filmovi{get; set;}
       public DbSet<Kategorija> Kategorije{get; set;}

        public FilmoviContext(DbContextOptions options):base(options)
        {

        }
    }
}