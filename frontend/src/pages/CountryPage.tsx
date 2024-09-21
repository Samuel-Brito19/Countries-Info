import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"
import * as Styled from '../styles'

interface CountryInfo {
    commonName: string
    borders: {
        commonName: string;
    }[];
}

interface FlagInfo {
    data: {
        flag: string
        name: string
    }
}

const CountryPage = () => {
    const [country, setCountry] = useState<CountryInfo>({} as CountryInfo)
    const [flags, setFlags] = useState<FlagInfo>({} as FlagInfo)
    const params = useParams()
  
    useEffect(() => {
        const fetchFlag = async() => {
            try {

                    const response = await api.post('http://localhost:3000/flag',{
                        country: country.commonName
                    })
                        setFlags(response.data)
                        console.log(response.data)
               
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchFlag()
    },[])

    useEffect(() => {
        const fetchCountry = async() => {
            try {
                const response = await api.post(`http://localhost:3000/tag/${params.code}`)
                setCountry(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCountry()
    },[params])



    return (
        <Styled.Container>
                <h2>
                    {country?.commonName} <img src={flags.data.flag} width="50"/>
                </h2>
            
            
        </Styled.Container>
    )
}

export default CountryPage