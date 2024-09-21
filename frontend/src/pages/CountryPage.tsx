import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import * as Styled from "../styles";
import { FaArrowLeft } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface CountryInfo {
  commonName: string;
  borders: {
    commonName: string;
    countryCode: string;
  }[];
}

interface FlagsInfo {
  data: {
    flag: string;
    name: string;
  };
}

interface PopulationInfo {
  country: string;
  data: {
    populationCounts: [
      {
        year: number;
        value: number;
      }
    ];
  };
}
const CountryPage = () => {
  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [flags, setFlags] = useState<FlagsInfo | null>(null);
  const [population, setPopulation] = useState<PopulationInfo | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await api.post(
          `http://localhost:3000/tag/${params.code}`
        );
        setCountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [params]);

  useEffect(() => {
    const fetchFlag = async () => {
      if (!country) return;
      try {
        const response = await api.post("http://localhost:3000/flag", {
          country: country?.commonName,
        });
        setFlags(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFlag();
  }, [country]);

  useEffect(() => {
    const fetchPopulation = async () => {
      if (!country) {
        return;
      }
      try {
        const response = await api.post(`http://localhost:3000/population`, {
          country: country?.commonName,
        });
        setPopulation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopulation();
  }, [country]);

  const ChartData = (): JSX.Element => {
    const ref = useRef();
    const barChartData = {
      labels: population?.data.populationCounts.map((p) => p.year) || [],
      datasets: [
        {
          label: "Population over the years",
          data: population?.data.populationCounts.map((p) => p.value) || [],
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    return <Bar data={barChartData} ref={ref} />;
  };
  if (!country || !flags || !population) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <Styled.Container>
      <Link to={`/`}>
        <FaArrowLeft />
      </Link>
      <Styled.FlagContainer>
        <h2>{country?.commonName}</h2>
        {flags && <img src={flags?.data.flag} width="50" height="30" />}
      </Styled.FlagContainer>

      <h3>Border Countries:</h3>
      <ul>
        {country?.borders && country.borders.length > 0 ? (
          country?.borders.map((c) => (
            <li key={c.countryCode}>
              <Link to={`/country/${c.countryCode}`}>{c.commonName}</Link>
            </li>
          ))
        ) : (
          <li>No border countries</li>
        )}
      </ul>
      <h3>Population Over Time:</h3>
      <Styled.ChartContainer>
        <ChartData />
      </Styled.ChartContainer>
    </Styled.Container>
  );
};

export default CountryPage;
