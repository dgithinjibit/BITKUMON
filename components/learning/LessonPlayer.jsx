
import React from 'react';
import { useLearningStore } from '../../lib/learningStore.js';
import { Card, CardContent } from '../ui/card.jsx';

export default function LessonPlayer({ lesson }) {
  const explanationLevel = useLearningStore((state) => state.explanationLevel);

  const getContent = () => {
    if (explanationLevel < 33) return lesson.content.simple;
    if (explanationLevel < 66) return lesson.content.medium;
    return lesson.content.expert;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-3xl font-bold mb-4">{lesson.title}</h2>
        
        {lesson.svg && (
          <div className="my-6 border rounded-lg overflow-hidden">
            <img src={`./assets/${lesson.svg}`} alt={`${lesson.title} diagram`} />
          </div>
        )}

        <div className="prose max-w-none text-gray-700">
          {getContent().split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
