import React, {useState, useEffect} from "react";

function App() {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState('UAH')
    const [toCurrency, setToCurrency] = useState('USD')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)
    const defaultCurrencies = ['UAH', "USD", 'EUR'];
    const hasRates = Object.keys(rates).length > 0

    useEffect(() => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((res) => res.json())
            .then((json) => {
                let list = {'UAH': 1}
                json.forEach((i) => {
                    if(defaultCurrencies.includes(i['cc'])) {
                        list[i['cc']] = i['rate']
                    }
                })
                setRates(list)
            }).catch(err => {
                console.warn(err)
                alert('C')
            })
    }, [])

    useEffect(() => {
        if(hasRates) {
            const result = toPrice * rates[toCurrency] / rates[fromCurrency]
            setFromPrice(result)
        }
    }, [fromCurrency])

    useEffect(() => {
        if(hasRates) {
            const result = fromPrice * rates[fromCurrency] / rates[toCurrency]
            setToPrice(result)
        }
    }, [toCurrency])

    const onChangeFromCurrency = (cur) => {
        const result = cur * rates[fromCurrency] / rates[toCurrency]
        setFromPrice(cur)
        setToPrice(result)
    }

    const onChangeToCurrency = (cur) => {
        const result = cur * rates[toCurrency] / rates[fromCurrency]
        setToPrice(cur)
        setFromPrice(result)
    }

    return (
        <div className="App">
            <header className="App-header">ITOP1000</header>
            <div className="content">
                <div className="block">
                    <select className="currencies" onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
                        {defaultCurrencies.map((cur) => (
                            <option value={cur} key={cur}> {cur} </option>
                        ))}
                    </select>
                    <input
                        onChange={(e) => onChangeFromCurrency(+e.target.value)}
                        value={fromPrice}
                        type="number"
                        placeholder={0}
                    />
                </div>

                <div className="block">
                    <select className="currencies" onChange={(e) => setToCurrency(e.target.value)} value={toCurrency} >
                        {defaultCurrencies.map((cur) => (
                            <option value={cur} key={cur}> {cur} </option>
                        ))}
                    </select>
                    <input
                        onChange={(e) => onChangeToCurrency(+e.target.value)}
                        value={toPrice}
                        type="number"
                        placeholder={0}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
