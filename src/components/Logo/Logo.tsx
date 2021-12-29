import img from "../../assets/logo-prisilietimo-menas.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <img src={img} width="350" alt="Prisilietimo menas"></img>
    </div>
  );
};

export default Logo;
