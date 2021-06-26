import axios from "../Axios/axios";

export const handleFetchData = async (url) => await axios.get(url);
export const getCountriesData = async (url) => await axios.get(url);
export const getCountryChangeData = async (url) => await axios.get(url);
export const getCountryDataByDays = async (url) => await axios.get(url);
