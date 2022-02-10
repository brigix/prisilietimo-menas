import { NavLink } from "react-router-dom";
import Button from "../components/FormElements/Button/Button";

const About = () => {
  return (
    <div className="main">
      <h4>
        Masažas - tai prisilietimo menas prie žmogaus kūno, sielos ir
        energetikos.
      </h4>
      <p>
        Kai kūnas neblokuotas ir neįtemptas, o yra harmonijoje, energija laisvai
        teka per jį. Tai visada garantuoja gerą sveikatą ir savijautą.
        Pasirūpinkite savo ir artimųjų sveikata. Profilaktinių masažų svarba:
      </p>
      <ul>
        <li>Padeda palaikyti geresnę sveikatos būklę;</li>
        <li>Lėtina senėjimo procesus;</li>
        <li> Gerina sąnarių paslankumą;</li>
        <li> Padeda odai išlikti stangresnei;</li>
        <li> Mažina raumenų įtampą;</li>
        <li> Mažina raumenų bei sąnarių skausmus;</li>
        <li> Ramina psichoemocinę būklę;</li>
        <li> Gerina savijautą ir nuotaiką.</li>
      </ul>
      <p>
        Turintys skausmų ar įtampų nugaroje, pečių zonoje - gydomojo masažo
        prisilietimas skirtas atkurti raumenų balansą, sumažinti įtampą
        nugaros-pečių-kaklo zonoje. Padeda užkirsti kelią skausmui ir grąžina
        kūno lengvumo pojūtį. Galima rinktis viso kūno gydomuosius ar
        atpalaiduojančius, nugaros-pečių-kaklo, pėdų-galvos masažus.
      </p>
      <div className="hero-about">
        <p>Rinkites laika masažui jau dabar!</p>
      </div>
      <NavLink to="/Booking">
        <Button
          name="Registruotis masažui"
          size="Button-Large"
          disabled={false}
        />
      </NavLink>
    </div>
  );
};

export default About;
