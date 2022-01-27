import kuponas from "../assets/dovanu-kuponas.jpg";
const Contact = () => {
  return (
    <div className="main-contact">
      <h4>
        Kviečiu registruotis telefonu +370 647 75065 arba asmenine FB žinute.
        <br />
        Dirbu Kaune ir Lapėse. <br />
        Galimybė įsigyti dovanų kuponą.
      </h4>
      <img src={kuponas} alt="Dovanu kuponas" className="img-contact"></img>
    </div>
  );
};

export default Contact;
