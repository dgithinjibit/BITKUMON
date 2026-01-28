
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { mockModules } from '../lib/mockData.js';
import { useLearningStore } from '../lib/learningStore.js';
import LessonPlayer from '../components/learning/LessonPlayer.jsx';
import ExercisePanel from '../components/learning/ExercisePanel.jsx';
import SecurityWarning from '../components/shared/SecurityWarning.jsx';
import AITutor from '../components/learning/AITutor.jsx';
import { Button } from '../components/ui/button.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog.jsx';

export default function Lesson() {
  const { id } = useParams();
  const completeLesson = useLearningStore((state) => state.completeLesson);
  const completedLessons = useLearningStore((state) => state.completedLessons);
  const unlockedModules = useLearningStore((state) => state.unlockedModules);

  let lesson = null;
  let currentModule = null;
  let nextLesson = null;

  for (const module of mockModules) {
    const lessonIndex = module.lessons.findIndex(l => l.id === id);
    if (lessonIndex !== -1) {
      lesson = module.lessons[lessonIndex];
      currentModule = module;
      if (lessonIndex + 1 < module.lessons.length) {
          nextLesson = module.lessons[lessonIndex + 1];
      }
      break;
    }
  }

  if (!lesson || !unlockedModules.includes(currentModule.id)) {
    return <Navigate to="/learn" replace />;
  }

  const handleLessonComplete = (quizScore) => {
    completeLesson(lesson.id, quizScore);
  };

  const isLessonPassed = completedLessons[lesson.id] && completedLessons[lesson.id] >= 0.9;

  return (
    <div>
      <SecurityWarning />
      <div className="grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
        <div className="lg:col-span-1">
          <LessonPlayer lesson={lesson} />
        </div>
        <div className="lg:col-span-1">
          {lesson.exercise && <ExercisePanel lesson={lesson} onComplete={handleLessonComplete} />}
        </div>
      </div>
      {isLessonPassed && nextLesson && (
        <div className="mt-8 text-center">
            <Link to={`/lesson/${nextLesson.id}`}>
                <Button size="lg" className="bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-white">
                    Continue to Next Lesson: {nextLesson.title}
                </Button>
            </Link>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
            <Button className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-lg bg-bitcoin-orange hover:bg-bitcoin-orange/90 flex items-center justify-center text-white text-3xl z-50">
                🧠
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col">
            <DialogHeader>
                <DialogTitle>BitKumon AI Tutor</DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-hidden">
                <AITutor lesson={lesson} />
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
