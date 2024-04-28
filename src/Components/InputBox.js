import React, { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = " ",
    amountDisable = false,
    currencyDisable = false,
    className = "",
    })
    {
    const amountInputId = useId()

    return (
        <div className={`bg-white p-3 rounded-lg flex flex-col text-sm ${className}`}>
            <div>
                <label htmlFor={amountInputId}  className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
            </div>
            <div className="w-full flex justify-between">
                <input
                    id={amountInputId}
                    className="border-2 border-black px-2 rounded-md w-1/2 bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
                />
                <select
                    className="border-2 border-black rounded-md cursor-pointer "
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                            {currency}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox