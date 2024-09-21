import { Link } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

interface Country {
  countryCode: string;
  name: string;
}

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/allcountries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map((c) => (
          <li key={c.countryCode}>
            <Link to={`/country/${c.countryCode}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
