import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function FinancialCalculator({ carDetail }) {

    const [carPrice, setCarPrice] = useState(0);
    const [intrestRate, setIntrestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [mp, setMp] = useState(0);

    const Calculate = () => {
        const p = carPrice - downPayment;
        const mi = intrestRate / 1200;
        const mp = (p * mi * Math.pow(1 + mi, loanTerm)) / (Math.pow(1 + mi, loanTerm) - 1);
        setMp(mp.toFixed(2));
    }

    return (
        <div className='p-10 border border-black rounded-xl shadow-md mt-7 '>
            <h2 className='font-medium text-2xl'>Financial Calculator</h2>
            <div className='flex gap-5 mt-5'>
                <div className='w-full'>
                    <label >Price $</label>
                    <Input type="number" onChange={(e) => setCarPrice(e.target.value)} />
                </div>

                <div className='w-full'>
                    <label >Intrest Rate</label>
                    <Input type="number" onChange={(e) => setIntrestRate(e.target.value)} />
                </div>
            </div>

            <div className='flex gap-5 mt-5'>
                <div className='w-full'>
                    <label >Loan Term (M)</label>
                    <Input type="number" onChange={(e) => setLoanTerm(e.target.value)} />
                </div>

                <div className='w-full'>
                    <label >Down Payment</label>
                    <Input type="number" onChange={(e) => setDownPayment(e.target.value)} />
                </div>
            </div>

          {mp>0 &&  <h2 className="font-medium text-primary text-2xl mt-5">Your Monthly Payment is : <span className="text-3xl font-mono">$ {mp}</span></h2>}
            <Button className='w-full  mt-10' size="lg"
                onClick={Calculate}
            >Calculate</Button>
        </div>
    )
}

export default FinancialCalculator