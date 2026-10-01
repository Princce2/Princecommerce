import type { Route } from "./+types/city";

type City = {
  venue: string;
  population?: number;
  house?: string;
  status: "open" | "closed";
};

const cityData: Record<string, City> = {
  austin: { venue: "Nobody Center", status: "open" },
  chicago: { venue: "United Center", status: "closed" },
};

// For updating the city data //
type UpdateCity = Partial<City>;
function updatecity(city: City, updates: UpdateCity) {
  return { ...city, ...updates };
}
// for (const key of Object.keys(cityData)) {
//     cityData[key] = updatecity(cityData[key], {population: 10000000, house: "Mansion"},);
// }

// For creating a new type from an existing one //
type NoStatuscity = Omit<City, "status">;

function toNoStatusCity(city: City): NoStatuscity {
  const { status, ...rest } = city;
  return rest;
}

type CityLabel = Pick<City, "venue" | "population">;

function toCityLabel(city: City): CityLabel {
  const { venue, population } = city;
  return { venue, population };
}

export async function loader({ params }: Route.LoaderArgs) {
  const city = cityData[params.city];

  if (!city) {
    throw new Response("City not found", { status: 404 });
  }

  return { city, cityName: params.city };
}

export default function City({ loaderData }: Route.ComponentProps) {
  const { city, cityName } = loaderData;
  const UpdatedCity = updatecity(city, {
    population: 10000000,
    house: "Mansion",
  });
  const cityWithoutStatus = toNoStatusCity(UpdatedCity);
  const cityLabel = toCityLabel(UpdatedCity);

  return (
    <div className="city py-10 ">
      <h2>Concert in {cityName}</h2>
      <p>venue: {city.venue}</p>
      <p>status: {city.status}</p>
      <p>population: {UpdatedCity.population?.toLocaleString()}</p>
      <p>house: {UpdatedCity.house}</p>
      <p>
        Venue: {cityWithoutStatus.venue}, population:{" "}
        {cityWithoutStatus.population}, house: {cityWithoutStatus.house}
      </p>
      <p>
        City Label: venue {cityLabel.venue}, population: {cityLabel.population}
      </p>
    </div>
  );
}
