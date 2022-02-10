import "./FormElements.css";

const WorkPlaces = ({ chooseCabinet }: any) => {
  const cabinets: string[] = ["Utenos g. 12, Kaunas", "Lapės, Kauno r."];

  const handleOnSelectCabinet = (cabinet: string) => {
    chooseCabinet(cabinet);
  };

  return (
    <div className="workplaces">
      <h4>Pasirinkite paslaugos vietą:</h4>
      <div className="container">
        {cabinets.map((cabinet) => (
          <div key={cabinet}>
            <input
              type="radio"
              id={cabinet}
              name="cabinet"
              value={cabinet}
              key={"input" + { cabinet }}
              onClick={() => handleOnSelectCabinet(cabinet)}
            />
            <label htmlFor={cabinet} key={"label" + { cabinet }}>
              {cabinet}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkPlaces;
