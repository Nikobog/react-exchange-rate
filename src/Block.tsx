import {DEFAULT_CURRENCIES} from "./constants";

export type TBlockProps = {
    price: number,
    currency: string,
    onChangePrice: (str:number) => void,
    onChangeCurrency: (str:string) => void,
}

export const Block = ({price, currency, onChangePrice, onChangeCurrency}:TBlockProps) => {

    return (
        <div className="block">
            <select className="currencies" onChange={(e) => onChangeCurrency(e.target.value)}
                    value={currency}>
                {DEFAULT_CURRENCIES.map((cur) => (
                    <option value={cur} key={cur}> {cur} </option>
                ))}
            </select>
            <input
                onChange={(e) => onChangePrice(+e.target.value)}
                value={price}
                type="number"
                placeholder="0"
            />
        </div>
    )
}
