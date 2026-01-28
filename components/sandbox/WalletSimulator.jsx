
import React, { useState } from 'react';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog.jsx';

const DANGEROUS_KEYWORDS = /\b(seed|private|xprv)\b/i;

export default function WalletSimulator() {
  const [balance] = useState(10.00);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txState, setTxState] = useState('idle'); // idle, pending, success, error
  const [error, setError] = useState('');

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    if (DANGEROUS_KEYWORDS.test(value)) {
      alert("STOP! Never enter real keys or seed phrases. This is a simulation. Malicious websites can steal your funds if you expose this information.");
      return;
    }
    setter(value);
  };
  
  const handleSend = () => {
    setError('');
    if (parseFloat(amount) > balance) {
        setTxState('error');
        setError('Insufficient funds.');
        return;
    }
    if (!address.startsWith('tb1q') || address.length < 20) {
        setTxState('error');
        setError('Invalid Testnet address format.');
        return;
    }

    setTxState('pending');
    setTimeout(() => {
      setTxState('success');
      setTimeout(() => {
        setTxState('idle');
        setAddress('');
        setAmount('');
      }, 3000);
    }, 2000);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Testnet Wallet</CardTitle>
        <CardDescription>Send and receive simulated Testnet Bitcoin (tBTC).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Your Balance</p>
          <p className="text-4xl font-bold">{balance.toFixed(2)} <span className="text-bitcoin-orange">tBTC</span></p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="address">Recipient Address</Label>
            <Input 
              id="address" 
              placeholder="tb1q..." 
              value={address} 
              onChange={(e) => handleInputChange(e, setAddress)} 
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => handleInputChange(e, setAmount)} 
            />
          </div>
        </form>
        {txState === 'error' && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full" disabled={!address || !amount || txState === 'pending' || txState === 'success'}>
              {txState === 'idle' && 'Review Transaction'}
              {txState === 'pending' && 'Sending...'}
              {txState === 'success' && 'Sent!'}
              {txState === 'error' && 'Review Transaction'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Safety Check!</AlertDialogTitle>
              <AlertDialogDescription>
                <ul className="list-disc list-inside space-y-2 text-left">
                  <li>You are about to send <strong className="text-black">{amount || '0.00'} tBTC</strong> to address <strong className="text-black break-all">{address || '...'}</strong>.</li>
                  <li>This is a <strong className="text-red-600">simulation</strong>. No real funds will be moved.</li>
                  <li>On the real network, transactions are <strong className="text-red-600">irreversible</strong>. Always double-check addresses.</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSend}>Proceed Safely</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
