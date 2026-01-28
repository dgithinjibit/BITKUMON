
import React, { useState } from 'react';
import { useLearningStore } from '../../lib/learningStore.js';
import { Button } from '../ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { RadioGroup, RadioGroupItem } from '../ui/radiogroup.jsx';
import { Label } from '../ui/label.jsx';

export default function ExercisePanel({ lesson, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { exercise } = lesson;

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    exercise.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = correctCount / exercise.questions.length;
    setScore(finalScore);
    setSubmitted(true);
    onComplete(finalScore);
  };
  
  const isSubmitDisabled = Object.keys(answers).length !== exercise.questions.length;
  const passed = score >= 0.9;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Test Your Knowledge</CardTitle>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <div className="space-y-6">
            {exercise.questions.map(q => (
              <div key={q.id}>
                <p className="font-semibold mb-2">{q.question}</p>
                <RadioGroup onValueChange={(value) => handleAnswerChange(q.id, value)}>
                  {q.options.map(opt => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                      <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Button onClick={handleSubmit} disabled={isSubmitDisabled} className="w-full">
              Submit Answers
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <p className="text-4xl font-bold my-4" style={{color: passed ? '#10b981' : '#ef4444'}}>
                {Math.round(score * 100)}%
            </p>
            {passed ? (
                <p className="text-green-700 bg-green-100 p-3 rounded-md">Excellent! You've mastered this concept. The next module is unlocked.</p>
            ) : (
                <p className="text-amber-700 bg-amber-100 p-3 rounded-md">Good try! A score of 90% or higher is needed to unlock the next module. Feel free to review the lesson and try again.</p>
            )}
            <Button onClick={() => setSubmitted(false)} className="mt-6">Try Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
