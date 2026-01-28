
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearningStore } from '../lib/learningStore.js';
import { mockOnboardingQuiz } from '../lib/mockData.js';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card.jsx';
import { RadioGroup, RadioGroupItem } from '../components/ui/radiogroup.jsx';
import { Checkbox } from '../components/ui/checkbox.jsx';
import { Label } from '../components/ui/label.jsx';
import { Progress } from '../components/ui/progress.jsx';

export default function Onboard() {
  const [step, setStep] = useState(1);
  const [background, setBackground] = useState('');
  const [goals, setGoals] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const setOnboardingData = useLearningStore((state) => state.setOnboardingData);
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step: process and submit
      const quizScore = mockOnboardingQuiz.reduce((score, question) => {
        return quizAnswers[question.id] === question.correctAnswer ? score + 1 : score;
      }, 0);
      
      setOnboardingData({
        background,
        goals,
        quizScore
      });
      navigate('/learn');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleGoalChange = (goal, checked) => {
    setGoals(prev => 
      checked ? [...prev, goal] : prev.filter(g => g !== goal)
    );
  };

  const isNextDisabled = () => {
    if (step === 1) return !background;
    if (step === 2) return goals.length === 0;
    if (step === 3) return Object.keys(quizAnswers).length !== mockOnboardingQuiz.length;
    return false;
  };
  
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle>Welcome to BitKumon</CardTitle>
          <CardDescription>Let's personalize your learning path. ({step}/{totalSteps})</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <Step1_Background value={background} onChange={setBackground} />}
          {step === 2 && <Step2_Goals value={goals} onChange={handleGoalChange} />}
          {step === 3 && <Step3_Quiz value={quizAnswers} onChange={setQuizAnswers} />}
          
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrev} disabled={step === 1}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={isNextDisabled()}>
              {step === totalSteps ? 'Finish & Start Learning' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Step1_Background = ({ value, onChange }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">What's your background?</h3>
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="flex items-center space-x-2 p-4 border rounded-md">
        <RadioGroupItem value="Newbie" id="r1" />
        <Label htmlFor="r1">I'm completely new to crypto.</Label>
      </div>
      <div className="flex items-center space-x-2 p-4 border rounded-md">
        <RadioGroupItem value="Developer" id="r2" />
        <Label htmlFor="r2">I'm a developer interested in the tech.</Label>
      </div>
      <div className="flex items-center space-x-2 p-4 border rounded-md">
        <RadioGroupItem value="Investor" id="r3" />
        <Label htmlFor="r3">I have some experience with investing.</Label>
      </div>
    </RadioGroup>
  </div>
);

const Step2_Goals = ({ value, onChange }) => {
  const goalsOptions = ["Secure my assets", "Understand the technology", "Identify scams", "Use Bitcoin privately"];
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">What are your learning goals? (select at least one)</h3>
      <div className="space-y-2">
        {goalsOptions.map(goal => (
          <div key={goal} className="flex items-center space-x-2 p-4 border rounded-md">
            <Checkbox id={goal} checked={value.includes(goal)} onCheckedChange={(checked) => onChange(goal, checked)} />
            <Label htmlFor={goal}>{goal}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

const Step3_Quiz = ({ value, onChange }) => {
    const handleAnswer = (questionId, answer) => {
        onChange(prev => ({...prev, [questionId]: answer}));
    }
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Quick Diagnostic Quiz</h3>
            <div className="space-y-6">
                {mockOnboardingQuiz.map((q, index) => (
                    <div key={q.id}>
                        <p className="font-medium mb-2">{index + 1}. {q.question}</p>
                        <RadioGroup onValueChange={(answer) => handleAnswer(q.id, answer)}>
                            {q.options.map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                    <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                ))}
            </div>
        </div>
    )
};
