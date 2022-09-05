import {api} from './services';
import {TBERates} from "./typings";

const RATES_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
export const fetchRates = () => api.get<TBERates>( RATES_URL )
