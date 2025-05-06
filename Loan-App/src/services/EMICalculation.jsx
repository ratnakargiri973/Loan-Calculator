import React, { useState } from 'react';
import { useThemeToggle } from '../contexts/ThemeContextProvider';
import { useEmiCalculator } from '../hooks/useEmiCalculator';

function EMICalculation({ loanAmount, interestRate, termYears, setShowResult }) {
  const [currency, setCurrency] = useState('INR');
  const { mode } = useThemeToggle();
  const { emiData, schedule } = useEmiCalculator(loanAmount, interestRate, termYears);

  if (!emiData) return null;

  const theadClass =
    mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900';

  return (
    <div className="mt-8 p-6 border rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">EMI Calculation Summary</h2>

      <p className="mb-4 text-lg">
        <strong>Monthly EMI:</strong> {currency} {emiData.monthlyEmi}
      </p>

      <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
        </select>
        <button
          onClick={() => setShowResult(false)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-purple-800 rounded border border-sky-500"
        >
          RESET TABLE
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">{`Amortization Schedule (${currency})`}</h2>
      <div className="overflow-auto max-h-96 border rounded">
        <table className="w-full table-auto text-sm">
          <thead className={`sticky top-0 ${theadClass}`}>
            <tr>
              <th className="border px-3 py-2">Month</th>
              <th className="border px-3 py-2">Principal</th>
              <th className="border px-3 py-2">Interest</th>
              <th className="border px-3 py-2">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.month} className="text-center">
                <td className="border px-3 py-2">{item.month}</td>
                <td className="border px-3 py-2">{item.principal} {currency}</td>
                <td className="border px-3 py-2">{item.interest} {currency}</td>
                <td className="border px-3 py-2">{item.remaining} {currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EMICalculation;
