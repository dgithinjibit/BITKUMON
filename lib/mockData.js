
export const mockOnboardingQuiz = [
  {
    id: 'q1',
    question: "What is a 'seed phrase' primarily used for?",
    options: [
      "Encrypting your computer",
      "Restoring access to your Bitcoin wallet",
      "Signing up for a new email",
      "It's a password for an exchange",
    ],
    correctAnswer: "Restoring access to your Bitcoin wallet",
  },
  {
    id: 'q2',
    question: "Where is the safest place to store a large amount of Bitcoin?",
    options: [
      "On a popular cryptocurrency exchange",
      "In a hardware wallet you control",
      "On your mobile phone's wallet app",
      "In a text file on your desktop",
    ],
    correctAnswer: "In a hardware wallet you control",
  },
  {
    id: 'q3',
    question: "If a transaction is confirmed on the Bitcoin blockchain, can it be reversed?",
    options: [
      "Yes, by contacting customer support",
      "Yes, if you have the transaction ID",
      "No, blockchain transactions are immutable",
      "Only within the first 24 hours",
    ],
    correctAnswer: "No, blockchain transactions are immutable",
  },
];

export const mockModules = [
  {
    id: 'm1',
    title: "Bitcoin Basics",
    description: "Understand the fundamental concepts of Bitcoin.",
    lessons: [
      {
        id: 'l1-1',
        title: "What is a UTXO?",
        svg: 'utxo-analogy.svg',
        content: {
          simple: "Imagine Bitcoin as digital cash. A UTXO is like a specific coin or bill. If someone sends you 1 Bitcoin, you get a '1 BTC bill'. To spend 0.5 BTC, you give them the 1 BTC bill and get a 0.5 BTC bill back as change. A UTXO is just an unspent 'bill'.",
          medium: "UTXO stands for Unspent Transaction Output. It's the core accounting model of Bitcoin. Unlike a bank account that has a single balance, a Bitcoin wallet is a collection of discrete UTXOs. Each UTXO is a specific amount of bitcoin from a previous transaction that is now available to be spent. When you make a transaction, you consume one or more UTXOs entirely and create new ones for the recipient and for yourself as change.",
          expert: "The UTXO model is a verification-oriented approach to transaction state. Each UTXO is an atomic data structure, identifiable by the hash of the transaction that created it and its index in that transaction's outputs. Wallets calculate their balance by scanning the blockchain for all UTXOs locked to their keys. This stateless model simplifies transaction validation, as nodes only need to check if a referenced UTXO exists and is unspent, preventing double-spends without needing a global account balance state."
        },
        exercise: {
          type: 'quiz',
          questions: [
            {
              id: 'ex1-q1',
              question: "If you have one UTXO of 2 BTC and want to send 0.5 BTC, what happens?",
              options: [
                "Your 2 BTC UTXO becomes 1.5 BTC.",
                "The 2 BTC UTXO is spent, and you get a new 1.5 BTC UTXO back as change.",
                "You can't send less than the full UTXO amount.",
              ],
              correctAnswer: "The 2 BTC UTXO is spent, and you get a new 1.5 BTC UTXO back as change.",
            },
            {
              id: 'ex1-q2',
              question: "What does UTXO stand for?",
              options: [
                "Universal Transaction Order",
                "Unspent Transaction Output",
                "Underwritten Transfer Object",
              ],
              correctAnswer: "Unspent Transaction Output",
            }
          ]
        }
      },
    ]
  },
  {
    id: 'm2',
    title: "Wallet Security",
    description: "Learn how to secure your funds like a professional.",
    lessons: [
       {
        id: 'l2-1',
        title: "Seed Phrases & Private Keys",
        content: {
          simple: "Think of your Bitcoin wallet like a treasure chest. The 'private key' is the actual key that opens it. A 'seed phrase' is a magical recipe to re-create that key if you lose it. Anyone with your seed phrase can make a copy of your key and take your treasure. That's why you must NEVER share it or type it online.",
          medium: "A private key is a secret, alphanumeric number that allows bitcoins to be spent. Every Bitcoin wallet contains one or more private keys. The seed phrase, or mnemonic phrase, is a list of 12-24 words that acts as a master backup for your entire wallet. Using a standard algorithm (BIP-39), this phrase can be used to deterministically regenerate all the private keys in your wallet. It's the ultimate root of access.",
          expert: "The seed phrase is a mnemonic encoding of a high-entropy random number, which serves as the seed for a Hierarchical Deterministic (HD) wallet (BIP-32). This seed is used to generate a master private key, which can then derive a virtually infinite tree of child keys and addresses. This structure allows for enhanced privacy (using a new address for each transaction) and simplified backup, as only the initial seed phrase needs to be secured to restore the entire wallet's history and funds."
        },
        exercise: {
          type: 'quiz',
          questions: [
            {
              id: 'ex2-q1',
              question: "What is the relationship between a seed phrase and a private key?",
              options: [
                "They are the same thing.",
                "A seed phrase is used to generate all your private keys.",
                "A private key is used to generate your seed phrase.",
              ],
              correctAnswer: "A seed phrase is used to generate all your private keys.",
            },
            {
              id: 'ex2-q2',
              question: "What is the most important rule about your seed phrase?",
              options: [
                "Store it in your email for easy access.",
                "Share it with a trusted support agent to verify your wallet.",
                "Never type it into any website or share it digitally.",
              ],
              correctAnswer: "Never type it into any website or share it digitally.",
            }
          ]
        }
      },
    ]
  },
  {
    id: 'm3',
    title: "Advanced Concepts",
    description: "Dive deeper into the Bitcoin protocol.",
    lessons: []
  }
];
