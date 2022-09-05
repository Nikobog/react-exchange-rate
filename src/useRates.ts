import { useState, useEffect } from 'react';
import {fetchRates} from "./fetchRates";
import {DEFAULT_CURRENCIES} from "./constants";

type TRates = Record<string, number>
export function useRates( ) {
    const [rates, setRates] = useState<TRates>({});

    useEffect(() => {
        fetchRates()
            .then((data) => {
                let rates: TRates = {'UAH': 1}
                data.forEach((i ) => {
                    const key = i.cc
                    if(DEFAULT_CURRENCIES.includes(key)) {
                        rates[key] = i.rate
                    }
                })
                setRates(rates)
            }).catch(err => {
                console.warn(err)
            })
    }, [])

    return rates
}

