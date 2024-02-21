import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpecies } from "./features/species/speciesSlice";

function App() {
  const dispatch = useDispatch();
  const { specieslist, status, error } = useSelector((state) => state.species);

  console.log(status, "status");
  useEffect(() => {
    if (status === "idle") dispatch(fetchSpecies());
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error : {error.message}</p>;
  return (
    <div className="container">
      <ul>
        {specieslist.map((species) => (
          <li key={species.name}>
            <h1>
              {species.name} - {species.classification}
            </h1>
            <p>{species.eyeColors.join(',')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
