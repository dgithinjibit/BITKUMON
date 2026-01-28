
import React from 'react';
import { Link } from 'react-router-dom';
import { useLearningStore } from '../lib/learningStore.js';
import { mockModules } from '../lib/mockData.js';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../components/ui/tooltip.jsx';
import ConfidenceScore from '../components/learning/ConfidenceScore.jsx';

export default function Dashboard() {
  const { securityScore, unlockedModules, userProfile } = useLearningStore();

  const getGreeting = () => {
    if (userProfile.background) {
      return `Welcome, ${userProfile.background}`;
    }
    return 'Welcome to your Dashboard';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-6 bg-white rounded-lg shadow">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}</h1>
          <p className="text-gray-600 mt-1">This is your personalized learning path. Start with unlocked modules.</p>
        </div>
        <ConfidenceScore score={securityScore} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Learning Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockModules.map(module => {
            const isUnlocked = unlockedModules.includes(module.id);
            const firstLessonId = module.lessons.length > 0 ? module.lessons[0].id : null;

            if (!isUnlocked) {
              return (
                <TooltipProvider key={module.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="opacity-60 cursor-not-allowed">
                        <ModuleCard module={module} isUnlocked={false} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Complete previous modules to unlock.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return (
              <Link to={firstLessonId ? `/lesson/${firstLessonId}` : '#'} key={module.id} className="focus:outline-none focus:ring-2 focus:ring-bitcoin-orange rounded-lg">
                <ModuleCard module={module} isUnlocked={true} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const ModuleCard = ({ module, isUnlocked }) => (
  <Card className={`h-full transition-all duration-300 ${isUnlocked ? 'hover:shadow-lg hover:border-bitcoin-orange' : 'filter blur-sm'}`}>
    <CardHeader>
      <CardTitle>{isUnlocked ? module.title : 'Locked Module'}</CardTitle>
      <CardDescription>{isUnlocked ? module.description : '...'}</CardDescription>
    </CardHeader>
    <CardContent>
      {isUnlocked && module.lessons.length > 0 ? (
        <ul className="list-disc list-inside text-sm text-gray-600">
          {module.lessons.slice(0, 3).map(lesson => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
          {module.lessons.length > 3 && <li>...and more</li>}
        </ul>
      ) : (
        <div className="h-16"></div>
      )}
    </CardContent>
  </Card>
);
