
import React from 'react';
import WalletSimulator from '../components/sandbox/WalletSimulator.jsx';
import SecurityWarning from '../components/shared/SecurityWarning.jsx';

export default function Sandbox() {
  return (
    <div className="py-8">
      <div className="max-w-md mx-auto">
        <SecurityWarning title="SANDBOX MODE">
            You are in a simulated environment. Actions here have no real-world consequences and use fake "Testnet" funds.
        </SecurityWarning>
      </div>
      <WalletSimulator />
    </div>
  );
}
