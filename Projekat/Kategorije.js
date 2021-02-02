export class Kategorije
{
    constructor()
    {
        this.KategorijeFilma=[];
        this.id=[];
    }

    dodajKategorije(kategorija)
    {
        this.KategorijeFilma.push(kategorija);
    }

    dodajID(id)
    {
        this.id.push(id);
    }

    Validacija()
    {
        let provera=true;
        const iterator=this.KategorijeFilma.values();
        for (const kategorija of iterator) {
            if(kategorija.value=="")
            {
               provera=false;
            }
          }
          return provera;
    }

    ObrisiSelect()
    {
        const iterator=this.KategorijeFilma.values();
        for (const kategorija of iterator) {
            kategorija.remove(); 
          }     
    }

    IzborKategorije(kategorija)
    {
        let provera=false;
        this.KategorijeFilma.forEach(el=>{
            if(el.value==kategorija)
            {
                provera=true;
                return provera;
            } 
        });
        return provera;
    }

    CrtajKategorije(host)
    {
        for (let i=0;i<this.KategorijeFilma.length;i++) {
                    let izbor=document.createElement("select");
                    izbor.className="vrsta";
                    host.appendChild(izbor);
                    let niz=[this.KategorijeFilma[i].value,"Akcija","Komedija","Triler","Avantura","Drama"];
                    let opcija=document.createElement("option");
                        opcija.innerHTML=this.KategorijeFilma[i].value;
                        izbor.appendChild(opcija);
                    niz.forEach(el=>{
                        if(this.KategorijeFilma[i].value!=el)
                        {
                        let opcija=document.createElement("option");
                        opcija.innerHTML=el;
                        izbor.appendChild(opcija);
                        }
                    });
                    this.KategorijeFilma[i]=izbor;
          }
    }

    UpisKategorije(id)
    {
        console.log("EVE ME BRACOO");
        this.KategorijeFilma.forEach(el=>{

            fetch("https://localhost:5001/Filmovi/UpisiKategorije/"+id,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            imeKategorije:el.value,
                            Film:id,
                        })
                    }).then(p=>{
                        if(p.ok){
                            console.log("UPIS IZVRSEN u KATEGORIJE");

                        }
                    });
        });
    }

    CitajIzBaze(id)
    {
        fetch("https://localhost:5001/Filmovi/PreuzmiKategoriju/"+id).then(p=>{
            p.json().then(data=>{
                data.forEach(el=>{
                    this.dodajID(el.idKategorije);
                    let izbor=document.createElement("select");
                    izbor.className="vrsta";
                    let opcija=document.createElement("option");
                    opcija.innerHTML=el.imeKategorije;
                    izbor.appendChild(opcija);
                    this.dodajKategorije(izbor);       
                });
            });
        }); 
    }

    UpdateBaza(id)
    {
        for(let i=0;i<this.id.length;i++)
        {
            fetch("https://localhost:5001/Filmovi/IzmeniKategoriju",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    idKategorije:this.id[i],
                    imeKategorije:this.KategorijeFilma[i].value
                })
            }).then(p=>{
                if(p.ok){
                    console.log("Izmena IZVRSENA U KAT");
                }
            });
        }
        
    }
    
    Brisi()
    {
        for(let i=0;i<this.id.length;i++)
        {
            var x=this.id[i];
            fetch("https://localhost:5001/Filmovi/IzbrisiKategoriju",{
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    idKategorije:x
                })
            }).then(p=>{
                if(p.ok){
                    console.log("Brise KAT");
                }
            });
        }
    }
}