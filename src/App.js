import { useState, useEffect, useCallback } from 'react';
import InputBox from './Components/InputBox';
import useCurrencyInfo from './Hooks/useCurrencyInfo';

function App() {
    const [ amount, setAmount ] = useState(0)
    const [copy, setCopy] = useState('Copy')
    const [ from, setFrom ] = useState('usd')
    const [ to, setTo ] = useState('inr')
    const [ convertedAmount, setConvertedAmount] = useState(0)

    const fromCurrencyInfo = useCurrencyInfo(from)
    const toCurrencyInfo = useCurrencyInfo(to);

    const fromOptions = Object.keys(fromCurrencyInfo)
    const toOptions = Object.keys(toCurrencyInfo);

    const swap = () => {
    setFrom(to)
    setTo(from)
    }

    useEffect(
        () => {
            setConvertedAmount((amount * fromCurrencyInfo[to]).toFixed(2))
            setCopy('Copy')
            },[ amount, from, to ,fromCurrencyInfo]
    )

    const handleClick = useCallback(
        () => {
            window.navigator.clipboard.writeText(convertedAmount)
            if (convertedAmount !== 0){
                setCopy('Copied')
            }
        }, [ convertedAmount ]
    )

    const styles = {
        'color' : 'black',
    }

    return (
        <div className="w-full min-h-full h-screen p-6 flex flex-col items-center bg-body bg-opacity-90" >
            <h1 className=' text-5xl md:text-6xl text-center font-extrabold mt-5 mb-24' style={styles}>Currency Convert</h1>
            <h2 className=' text-2xl md:text-3xl text-center font-extrabold mb-10' style={styles}> Convert { from.toUpperCase() } to { to.toUpperCase() } at the real exchange rate. </h2>
            <div className="w-full">
                <div className="w-full sm:w-3/4 mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white">
                <p className='text-xl text-center font-semibold mb-8'>{1} {from.toUpperCase()} = <span className=' text-green-700'>{(1 * fromCurrencyInfo[to]).toFixed(2)}</span> {to.toUpperCase()}</p>
                    <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        }}>

                        <div className='flex flex-col md:flex-row justify-center align-items-center'>
                        <div className="w-full shadow-md shadow-black rounded-md p-2">
                            <InputBox
                                label="Amount"
                                amount={amount}
                                currencyOptions={fromOptions}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative self-center w-6 h-1">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 md:rotate-180 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap} >
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                            </button>
                        </div>
                        <div className="w-full shadow-md shadow-black rounded-md p-2">
                            <InputBox
                                label="Converted To"
                                amount={convertedAmount}
                                currencyOptions={toOptions}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        </div>
                        <div className='mt-5 flex justify-center md:justify-end'>
                            <button type="submit" className="sm:m-5 md:m-0 self-center lg:self-end w-32 bg-blue-600 text-white p-3 rounded-lg" onClick={handleClick}>
                                {copy}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
