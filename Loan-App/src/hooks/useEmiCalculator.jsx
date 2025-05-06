import { useState, useEffect } from 'react';

export function useEmiCalculator(loanAmount, interestRate, termYears) {
  const [emiData, setEmiData] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (loanAmount && interestRate && termYears) {
      const P = parseFloat(loanAmount);
      const R = parseFloat(interestRate) / 12 / 100;
      const N = parseFloat(termYears) * 12;

      const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalPayment = EMI * N;
      const totalInterest = totalPayment - P;

      setEmiData({
        monthlyEmi: EMI.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      });

      let balance = P;
      const amortization = [];

      for (let i = 1; i <= N; i++) {
        const interest = balance * R;
        const principal = EMI - interest;
        balance -= principal;

        amortization.push({
          month: i,
          principal: principal.toFixed(2),
          interest: interest.toFixed(2),
          remaining: balance > 0 ? balance.toFixed(2) : '0.00',
        });
      }

      setSchedule(amortization);
    } else {
      setEmiData(null);
      setSchedule([]);
    }
  }, [loanAmount, interestRate, termYears]);

  return { emiData, schedule };
}
