
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useLearningStore } from '../../lib/learningStore.js';
import { Button } from '../ui/button.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { ScrollArea } from '../ui/scroll-area.jsx';
import { Card } from '../ui/card.jsx';

const AITutor = ({ lesson }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = useLearningStore((state) => state.userProfile);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const initializeChat = () => {
      if (!process.env.API_KEY) {
        console.error("API_KEY is not set.");
        setMessages([{ role: 'model', text: 'Error: API key is not configured. Please contact support.' }]);
        return;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are BITKUMON AI, a Kumon-method Bitcoin educator. Your philosophy: 'Mastery before progression.'
        USER CONTEXT:
        - Background: ${userProfile.background || 'Newbie'}
        - Goals: ${userProfile.goals.join(', ') || 'Learn Bitcoin safely.'}
        CURRENT LESSON:
        - Title: ${lesson.title}
        - Content Summary: ${lesson.content.medium}
        TEACHING RULES:
        - Use analogies matched to the user's background. For a developer, you can be more technical. For a newbie, use simple, real-world analogies.
        - After explaining a concept, you can suggest a simple real-world scenario question.
        - If the user seems confused, simplify your explanation.
        - NEVER give financial advice. Always append responses with: "This is for educational purposes only."
        - Do not reveal direct answers to the lesson's quiz questions. Guide the user to discover the answer themselves by explaining the concepts.
        SAFETY MANDATE:
        - If a user mentions their own real seed phrase or private key, IMMEDIATELY stop and respond ONLY with: "STOP. Never share your real seed phrase or private keys with anyone, including me. It could lead to a complete loss of your funds. Let's get back to learning safely."
      `;

      const newChat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction },
      });
      setChat(newChat);
      setMessages([{ role: 'model', text: `Hi! I'm your AI Tutor. Ask me anything about "${lesson.title}".` }]);
    };
    initializeChat();
  }, [lesson, userProfile]);

  useEffect(() => {
    // This is a simple way to scroll to the bottom.
    // In a real app, you might use a more robust solution.
    setTimeout(() => {
        const viewport = document.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, 100);
  }, [messages]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const userMessage = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userInput });
      const modelMessage = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow h-[400px] pr-4 mb-4">
             <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <Card className={`p-3 max-w-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                            {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                        </Card>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <Card className="p-3 bg-secondary">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </Card>
                    </div>
                )}
             </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-grow"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                    }
                }}
            />
            <Button type="submit" disabled={isLoading || !userInput.trim()}>Send</Button>
        </form>
    </div>
  );
};

export default AITutor;
