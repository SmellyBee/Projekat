using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmoviController : ControllerBase
    {
       
       public FilmoviContext Context{get; set;}

        public FilmoviController(FilmoviContext context)
        {
            Context=context;
        }

        [Route("PreuzmiIzgled")]
        [HttpGet]
        public async Task<List<Izgled>> PreuzmiIzgled()
        {
           return await Context.Izgledi.ToListAsync();
        }

        [Route("UpisiIzgled")]
        [HttpPost]
        public async Task UpisiIzgled([FromBody] Izgled izgled)
        {
           Context.Izgledi.Add(izgled);
           await Context.SaveChangesAsync();
        }

        [Route("IzmeniIzgled")]
        [HttpPut]
        public async Task IzmeniIzgled([FromBody] Izgled izgled)
        {
            Context.Update<Izgled>(izgled);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniFilm")]
        [HttpPut]
        public async Task<IActionResult> IzmeniFilm([FromBody] Film film)
        {
           bool x=true;
           if(!Regex.IsMatch(film.Ime, @"^[a-zA-Z]+$"))
           x=false;
           if(!Regex.IsMatch(film.Reziser,@"^[a-zA-Z]+$"))
           x=false;           
           if(film.Slika=="")
           x=false;
           if(x==true)
           {
            Context.Update<Film>(film);
            await Context.SaveChangesAsync();
            return Ok();
           }
           else
           {
               return StatusCode(406);
           }
        }

        [Route("IzmeniKategoriju")]
        [HttpPut]
        public async Task IzmeniKategoriju([FromBody] Kategorija kategorija)
        {
             Context.Update<Kategorija>(kategorija);
            await Context.SaveChangesAsync();  
        }

        [Route("IzbrisiIzgled/{id}")]
        [HttpDelete]
        public async Task IzbrisiIzgled(int id)
        {
            var izgled=await Context.Izgledi.FindAsync(id);
            Context.Remove(izgled);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiFilm")]
        [HttpDelete]
        public async Task IzbrisiKategoriju([FromBody] Film film)
        {
            Context.Remove(film);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiKategoriju")]
        [HttpDelete]
        public async Task IzbrisiKategoriju([FromBody] Kategorija kategorija)
        {
            Context.Remove(kategorija);
            await Context.SaveChangesAsync();
        }


        [Route("UpisiFilm/{idIzgled}")]
        [HttpPost]
        public async Task<IActionResult> UpisiFilm(int idIzgled,[FromBody] Film film)
        {
           bool x=true;
           var izgled=await Context.Izgledi.FindAsync(idIzgled);
           film.Izgled=izgled;
           if(!Regex.IsMatch(film.Ime, @"^[a-zA-Z]+$"))
           x=false;
           if(!Regex.IsMatch(film.Reziser,@"^[a-zA-Z]+$"))
           x=false;           
           if(film.Slika=="")
           x=false;
           if(x==true)
           {
           Context.Filmovi.Add(film);
           await Context.SaveChangesAsync();
           return Ok();
           }
           else
           {
            return StatusCode(406);
           }
        }

        [Route("PreuzmiFilm")]
        [HttpGet]
        public async Task<List<Film>> PreuzmiFilm()
        {
           return await Context.Filmovi.ToListAsync();
        }

        [Route("UpisiKategorije/{idFilm}")]
        [HttpPost]
        public async Task UpisiFilm(int idFilm,[FromBody] Kategorija kategorija)
        {
           
           var film=await Context.Filmovi.FindAsync(idFilm);
           if(film!=null)
           {
           kategorija.Film=film;
           Context.Kategorije.Add(kategorija);
           await Context.SaveChangesAsync();
           }
           
        }

        [Route("PreuzmiKategoriju/{idFilm}")]
        [HttpGet]
        public async Task<List<Kategorija>> PreuzmiKategoriju(int idFilm)
        {
           var film=await Context.Filmovi.FindAsync(idFilm);
           var kategorija=await Context.Kategorije.Where(k=>k.Film==film).ToListAsync();
           return kategorija;
        }

        [Route("PreuzmiSveKategorije")]
        [HttpGet]
        public async Task<List<Kategorija>> PreuzmiSveKategorije()
        {
           return await Context.Kategorije.ToListAsync();
        }

    }
}
