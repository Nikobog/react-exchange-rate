import {useState, useEffect} from "react";
import {useRates} from './useRates';
import {Block, TBlockProps} from './Block';

function App() {
    const [fromCurrency, setFromCurrency] = useState('UAH')
    const [toCurrency, setToCurrency] = useState('USD')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)
    const rates = useRates()
    const hasRates = Object.keys(rates).length > 0

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

    const onChangeFromPrice:TBlockProps['onChangePrice'] = (price) => {
        const result = price * rates[fromCurrency] / rates[toCurrency]
        setFromPrice(price)
        setToPrice(result)
    }

    const onChangeToPrice:TBlockProps['onChangePrice'] = (price) => {
        const result = price * rates[toCurrency] / rates[fromCurrency]
        setToPrice(price)
        setFromPrice(result)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>USD: {rates['USD']}</div>
                <div>EUR: {rates['EUR']}</div>
            </header>

            <div className="content">
                <Block
                    price={fromPrice}
                    currency={fromCurrency}
                    onChangePrice={onChangeFromPrice}
                    onChangeCurrency={setFromCurrency}
                />

                <Block
                    price={toPrice}
                    currency={toCurrency}
                    onChangePrice={onChangeToPrice}
                    onChangeCurrency={setToCurrency}
                />
            </div>
        </div>
    );
}

export default App;
