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
        if (response.data) {
          setFlags(response.data);
        } else {
          console.log("HI");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPopulation = async () => {
      if (!country) return;
      try {
        const response = await api.post(`http://localhost:3000/population`, {
          country: country?.commonName,
        });
        if (response.data) {
          setPopulation(response.data);
        } else {
          console.log("HI 2");
        }
      } catch (error) {
        console.log("Caiu no erro");
      }
    };
    fetchFlag();
    fetchPopulation();
  }, [country]);

  // useEffect(() => {

  //   fetchPopulation();
  // }, [country]);

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
    if (!flags || !population) {
      return <div>Loading...</div>;
    }
    return <Bar data={barChartData} ref={ref} />;
  };

  return (
    <Styled.Container>
      <Link to={`/`}>
        <FaArrowLeft />
      </Link>
      <Styled.ContentContainer>
        <Styled.FlagContainer>
          <h2>{country?.commonName}</h2>
          {flags?.data.flag && (
            <img src={flags?.data.flag} width="50" height="30" />
          )}
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
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default CountryPage;
