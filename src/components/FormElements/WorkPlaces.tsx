import "./FormElements.css";

const WorkPlaces = ({ chooseCabinet }: any) => {
  const cabinets: string[] = ["Kaunas, Ukmergės g.", "Lapės, Panerių g."];

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
              onClick={() => chooseCabinet(cabinet)}
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
