
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';

const valueProps = [
  {
    title: 'Testnet Sandbox',
    description: 'Experiment with sending and receiving Bitcoin on a test network. Make mistakes without any financial risk.',
    icon: '🧪'
  },
  {
    title: 'Adaptive Path',
    description: 'Our system learns your knowledge level and tailors lessons to fill your gaps, from beginner to expert.',
    icon: '🌱'
  },
  {
    title: 'Scam Defense',
    description: 'Learn to identify and avoid common scams. We build your security mindset first.',
    icon: '🛡️'
  }
];

export default function Landing() {
  return (
    <div className="flex flex-col items-center text-center pt-12 pb-24">
      <main className="flex-1">
        <div className="py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6">
            Master Bitcoin Without Losing Funds
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            BitKumon is a safety-first, simulated learning environment. Practice, learn, and build confidence before ever touching real cryptocurrency.
          </p>
          <Link to="/onboard">
            <Button size="lg" className="bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-white">
              Start Your Free Training
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          {valueProps.map((prop) => (
            <Card key={prop.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{prop.icon}</span>
                  <span>{prop.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {prop.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
