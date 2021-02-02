import {Film} from "./Film.js"
import {Kategorije} from "./Kategorije.js"
export class Izgled
{
    constructor(id,x)
    {
        this.id=id;
        this.idfilm=x;
        const forma=false; 
        this.Filmovi=[];
        this.filmoviforma;
    }

    dodajFilm(film)
    {
        this.Filmovi.push(film);
    }
    
    crtajFormu(host)
    {
        const kontForma = document.createElement("div");
        kontForma.className="kontForma";
        host.appendChild(kontForma);

        const meniForma = document.createElement("div");
        meniForma.className="meniForma";
        kontForma.appendChild(meniForma);


        const UnosForma = document.createElement("div");
        UnosForma.className="kontForma";
        kontForma.appendChild(UnosForma);
        

        const FilmoviForma = document.createElement("div");
        FilmoviForma.className="FilmoviForma";
        kontForma.appendChild(FilmoviForma);
        this.filmoviforma=FilmoviForma;

        var elADD = document.createElement("h3");
        elADD.innerHTML="Dodaj";
        elADD.className="meni";
        meniForma.appendChild(elADD);

        var elKategorija = document.createElement("h3");
        elKategorija.className="meni";
        elKategorija.innerHTML="Kategorija";
        meniForma.appendChild(elKategorija);

        elADD.onclick=(ev)=>{
            if(!this.forma)
            {
                this.forma=true;

                const Lblime=document.createElement("label");
                Lblime.className="labela";
                Lblime.innerHTML="Ime filma";
                UnosForma.appendChild(Lblime);
    
                let InputIme= document.createElement("input");
                InputIme.className="vrsta";
                UnosForma.appendChild(InputIme);
    
                const Lblreziser=document.createElement("label");
                Lblreziser.className="labela";
                Lblreziser.innerHTML="Ime rezisera";
                UnosForma.appendChild(Lblreziser);
    
                let InputReziser= document.createElement("input");
                InputReziser.className="vrsta";
                UnosForma.appendChild(InputReziser);
    
                const Lblgodina=document.createElement("label");
                Lblgodina.className="labela";
                Lblgodina.innerHTML="Godina";
                UnosForma.appendChild(Lblgodina);
    
                let InputGodina= document.createElement("input");
                InputGodina.className="vrsta";
                UnosForma.appendChild(InputGodina);
    
                const Lblocena=document.createElement("label");
                Lblocena.className="labela";
                Lblocena.innerHTML="Ocena";
                UnosForma.appendChild(Lblocena);
    
                let InputOcena= document.createElement("input");
                InputOcena.className="vrsta";
                UnosForma.appendChild(InputOcena);
                
                const Lblkategorija=document.createElement("label");
                Lblkategorija.className="labela";
                Lblkategorija.innerHTML="Kategorija";
                UnosForma.appendChild(Lblkategorija);

                const DodajKategorijuDugme=document.createElement("button");
                DodajKategorijuDugme.innerHTML="Dodaj Kategoriju";
                DodajKategorijuDugme.className="dodaj";
                UnosForma.appendChild(DodajKategorijuDugme);

                const KategorijaForma = document.createElement("div");
                KategorijaForma.className="katForma";
                UnosForma.appendChild(KategorijaForma);

                let kategorija=new Kategorije();

                DodajKategorijuDugme.onclick=(ev)=>{

                let izbor=document.createElement("select");
                izbor.className="vrsta";
                KategorijaForma.appendChild(izbor);
                let niz=["","Akcija","Komedija","Triler","Avantura","Drama"];
                niz.forEach(el=>{
    
                    let opcija=document.createElement("option");
                    opcija.innerHTML=el;
                    izbor.appendChild(opcija);
                });

                kategorija.dodajKategorije(izbor);

            }
                

                const LblSlika=document.createElement("label");
                LblSlika.className="labela";
                LblSlika.innerHTML="Slika";
                UnosForma.appendChild(LblSlika);

                let img=document.createElement("img");
                img.className="Slika";
                let proba="";

                let InputSlika= document.createElement("input");
                InputSlika.className="vrsta";
                UnosForma.appendChild(InputSlika);
                InputSlika.type="file";
                InputSlika.addEventListener("change",function(){

                    const reader=new FileReader();
                    reader.readAsDataURL(this.files[0]);
                    reader.addEventListener("load",()=>{
                       proba=reader.result; 
                       img.setAttribute("src",reader.result);

                    });
                });


                const DodajDugme=document.createElement("button");
                DodajDugme.innerHTML="Dodaj";
                DodajDugme.className="dodaj";
                UnosForma.appendChild(DodajDugme);


                DodajDugme.onclick=(ev)=>{
                    
                        this.idfilm++;
                        console.log(this.idfilm);

                    fetch("https://localhost:5001/Filmovi/UpisiFilm/"+this.id,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            ime:InputIme.value,
                            reziser:InputReziser.value,
                            godina:InputGodina.value,
                            ocena:InputOcena.value,
                            slika:proba,
                        })
                    }).then(p=>{
                        if(p.ok){
                            console.log("UPIS IZVRSEN");
                            let film=new Film(InputIme.value,InputReziser.value,InputGodina.value,InputOcena.value,kategorija,img,this.idfilm);
                            this.dodajFilm(film);
                            film.UpisKategorija(film);
                            film.CrtajRam(FilmoviForma);
                        }
                    });

                    Lblime.remove();
                    Lblgodina.remove();
                    Lblkategorija.remove();
                    Lblocena.remove();
                    Lblreziser.remove();
                    InputIme.remove();
                    InputOcena.remove();
                    InputReziser.remove();
                    InputGodina.remove();
                    DodajKategorijuDugme.remove();
                    kategorija.ObrisiSelect();
                    DodajDugme.remove();
                    LblSlika.remove();
                    InputSlika.remove();
                    this.forma=false;
                    }      
            }
            
        }
        elKategorija.onclick=(ev)=>{

                let izborkat=document.createElement("select");
                izborkat.className="vrsta";
                UnosForma.appendChild(izborkat);
                let niz=["","Akcija","Komedija","Triler","Avantura","Drama"];
                niz.forEach(el=>{
    
                    let opcija=document.createElement("option");
                    opcija.innerHTML=el;
                    izborkat.appendChild(opcija);
                });

                const IzaberiKategorijuDugme=document.createElement("button");
                IzaberiKategorijuDugme.innerHTML="Izaberi Kategoriju";
                IzaberiKategorijuDugme.className="dodaj";
                UnosForma.appendChild(IzaberiKategorijuDugme);

                IzaberiKategorijuDugme.onclick=(ev)=>{
                    this.Filmovi.forEach(el=>{
                        el.VratiRam().remove();
                    });
                    this.Filmovi.forEach(el=>{
                        el.Izbor(izborkat.value,FilmoviForma);
                    });
                    izborkat.remove();
                    IzaberiKategorijuDugme.remove();
                }

        }
        FilmoviForma.onclick=(ev)=>{
            this.Azuriraj(UnosForma,FilmoviForma);
        }


    }


      Azuriraj(host,host2)
       {
          for(let i=0;i<this.Filmovi.length;i++)
           {
              this.Filmovi[i].VratiRam().onclick=(el)=>{
              this.Filmovi[i].AzurirajRam(host,this.Filmovi[i].VratiIme(),this.Filmovi[i].VratiRezisera(),this.Filmovi[i].VratiGodinu(),this.Filmovi[i].VratiOcenu(),this.Filmovi[i],host2);
              

              }
            }
        }

      UcitajizBazeFilmove(id,ime,reziser,godina,ocena,slika,maxidkategorije)
      {
        let img=document.createElement("img");
        img.className="Slika";
        img.setAttribute("src",slika);

        let kategorija=new Kategorije();
        kategorija.CitajIzBaze(id);
        let film=new Film(ime,reziser,godina,ocena,kategorija,img,id);
        this.dodajFilm(film);
        film.CrtajRam(this.filmoviforma);
      }  

}