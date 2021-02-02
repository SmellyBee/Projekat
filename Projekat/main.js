import {Izgled} from "./Izgled.js"

fetch("https://localhost:5001/Filmovi/PreuzmiIzgled").then(p=>{
      p.json().then(data=>{
        data.forEach(element => {
                          
            fetch("https://localhost:5001/Filmovi/PreuzmiFilm").then(f=>{
                f.json().then(datafilm=>{
                    var x;
                    datafilm.forEach(el=>{
                    x=el.id;
                    });
                    if(x==null)
                    {
                        x=1;
                        console.log(x);
                    }
                    let izgled=new Izgled(element.iD,x);
                    izgled.crtajFormu(document.body);

                    
                    datafilm.forEach(el=>{
                        izgled.UcitajizBazeFilmove(el.id,el.ime,el.reziser,el.godina,el.ocena,el.slika);
                    });
                });
            });

          });
       });
 });
            
    

