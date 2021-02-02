import {Kategorije} from "./Kategorije.js"
export class Film
{
    constructor(ime,reziser,godina,ocena,kategorija,slika,id)
    {
        this.id=id;
        this.ime=ime;
        this.reziser=reziser;
        this.godina=godina;
        this.ocena=ocena;
        this.kategorija=kategorija;
        this.slika=slika;
        this.ram=null;
    }

    CrtajRam(host){
        this.ram = document.createElement("div");
        this.ram.className="ramZaFilm";
        host.appendChild( this.ram);

        this.ram.appendChild(this.slika);
    }

    VratiID()
    {
        return this.id;
    }
    VratiRam()
    {
        return this.ram;
    }
    VratiIme()
    {
        return this.ime;
    }
    PostaviIme(host)
    {
        this.ime=host;
    }
    PostaviRezisera(host)
    {
        this.reziser=host;
    }
    VratiRezisera()
    {
        return this.reziser;
    }
    PostaviGodinu(host)
    {
        this.godina=host;
    }
    VratiGodinu()
    {
        return this.godina;
    }
    PostaviOcenu(host)
    {
        this.ocena=host;
    }
    VratiOcenu()
    {
        return this.ocena;
    }
    PostaviKategoriju(host)
    {
        this.kategorija=host;
    }
    VratiKategoriju()
    {
        return this.kategorija;
    }
    PostaviSliku(host)
    {
        this.slika=host;
    }
    VratiSliku()
    {
        return this.slika;
    }

    Izbor(izabranakategorija,host)
    {
      
       if(this.kategorija.IzborKategorije(izabranakategorija)==true)
       {
           
           this.CrtajRam(host);
       }
    }

    AzurirajRam(host,Ime,Reziser,Godina,Ocena,Film,host2)
    {   
                const Lblime=document.createElement("label");
                Lblime.className="labela";
                Lblime.innerHTML="Ime filma";
                host.appendChild(Lblime);
    
                let InputIme= document.createElement("input");
                InputIme.className="vrsta";
                InputIme.setAttribute("value",Ime);
                host.appendChild(InputIme);
    
                const Lblreziser=document.createElement("label");
                Lblreziser.className="labela";
                Lblreziser.innerHTML="Ime rezisera";
                host.appendChild(Lblreziser);
    
                let InputReziser= document.createElement("input");
                InputReziser.className="vrsta";
                InputReziser.setAttribute("value",Reziser);
                host.appendChild(InputReziser);
    
                const Lblgodina=document.createElement("label");
                Lblgodina.className="labela";
                Lblgodina.innerHTML="Godina";
                host.appendChild(Lblgodina);
    
                let InputGodina= document.createElement("input");
                InputGodina.className="vrsta";
                InputGodina.setAttribute("value",Godina);
                host.appendChild(InputGodina);
    
                const Lblocena=document.createElement("label");
                Lblocena.className="labela";
                Lblocena.innerHTML="Ocena";
                host.appendChild(Lblocena);
    
                let InputOcena= document.createElement("input");
                InputOcena.className="vrsta";
                InputOcena.setAttribute("value",Ocena);
                host.appendChild(InputOcena);
                
                const Lblkategorija=document.createElement("label");
                Lblkategorija.className="labela";
                Lblkategorija.innerHTML="Kategorija";
                host.appendChild(Lblkategorija);

                const KategorijaForma = document.createElement("div");
                KategorijaForma.className="katForma";
                host.appendChild(KategorijaForma);

                Film.VratiKategoriju().CrtajKategorije(KategorijaForma);

                const LblSlika=document.createElement("label");
                LblSlika.className="labela";
                LblSlika.innerHTML="Slika";
                host.appendChild(LblSlika);

                let img=document.createElement("img");
                img.className="Slika";
                let proba="";
                img=Film.VratiSliku();

                let InputSlika= document.createElement("input");
                InputSlika.className="vrsta";
                host.appendChild(InputSlika);
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
                DodajDugme.innerHTML="Izmeni";
                DodajDugme.className="dodaj";
                host.appendChild(DodajDugme);

                const BrisiDugme=document.createElement("button");
                BrisiDugme.innerHTML="Izbrisi";
                BrisiDugme.className="dodaj";
                host.appendChild(BrisiDugme);

                BrisiDugme.onclick=(ev)=>{

                    Film.VratiKategoriju().Brisi();
                    fetch("https://localhost:5001/Filmovi/IzbrisiFilm",{
                        method:'DELETE',
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            id:Film.VratiID()
                        })
                    }).then(p=>{
                        if(p.ok){
                            console.log("Brise KAT");
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
                    Film.VratiKategoriju().ObrisiSelect();
                    DodajDugme.remove();
                    LblSlika.remove();
                    InputSlika.remove();
                    this.forma=false;
                    BrisiDugme.remove();
                    Film.VratiRam().remove();
                    Film.VratiIme().remove();
                    Film.VratiRezisera().remove();
                    Film.VratiGodinu().remove();
                    Film.VratiOcenu().remove();
                    Film.VratiSliku().remove();
                    Film.VratiKategoriju().remove();
                    this.slika.remove();
                }

                DodajDugme.onclick=(ev)=>{

                    Lblime.remove();
                    Lblgodina.remove();
                    Lblkategorija.remove();
                    Lblocena.remove();
                    Lblreziser.remove();
                    InputIme.remove();
                    InputOcena.remove();
                    InputReziser.remove();
                    InputGodina.remove();
                    Film.VratiKategoriju().ObrisiSelect();
                    DodajDugme.remove();
                    BrisiDugme.remove();
                    LblSlika.remove();
                    InputSlika.remove();
                    this.forma=false;
                    this.slika.remove();

                    fetch("https://localhost:5001/Filmovi/IzmeniFilm",{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            id:Film.VratiID(),
                            ime:InputIme.value,
                            reziser:InputReziser.value,
                            godina:InputGodina.value,
                            ocena:InputOcena.value,
                            slika:proba,
                        })
                    }).then(p=>{
                        if(p.ok){
                            console.log("Izmena IZVRSENA");
                            Film.PostaviIme(InputIme.value);
                            Film.PostaviRezisera(InputReziser.value);
                            Film.PostaviGodinu(InputGodina.value);
                            Film.PostaviOcenu(InputOcena.value);
                            Film.PostaviKategoriju(Film.VratiKategoriju());
                            Film.PostaviSliku(img);
                            Film.VratiRam().appendChild(img);
                            Film.VratiKategoriju().UpdateBaza(Film.VratiID());
                        }
                        else
                        {
                            Film.PostaviIme(Ime);
                            Film.PostaviRezisera(Reziser);
                            Film.PostaviGodinu(Godina);
                            Film.PostaviOcenu(Ocena);
                            Film.PostaviKategoriju(Film.VratiKategoriju());
                            Film.PostaviSliku(Film.VratiSliku());
                            Film.VratiRam().appendChild(Film.VratiSliku());
                            Film.VratiKategoriju().UpdateBaza(Film.VratiID());
                        }
                    });


                }       
    }
    UpisKategorija(object)
    {
        object.VratiKategoriju().UpisKategorije(this.id);
    }
}