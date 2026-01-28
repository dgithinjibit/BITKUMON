
import React from 'react';
import { useLearningStore } from '../../lib/learningStore.js';
import { Slider } from '../ui/slider.jsx';
import { Label } from '../ui/label.jsx';

export default function ExplanationSlider() {
  const { explanationLevel, setExplanationLevel } = useLearningStore(state => ({
    explanationLevel: state.explanationLevel,
    setExplanationLevel: state.setExplanationLevel
  }));

  const getLabel = (level) => {
    if (level < 33) return "ELI5";
    if (level < 66) return "Normal";
    return "Expert";
  };

  return (
    <div className="flex items-center gap-4 w-full">
        <Label htmlFor="explanation-slider" className="whitespace-nowrap text-sm text-gray-600">
            Explain Like I'm... <span className="font-bold text-black">{getLabel(explanationLevel)}</span>
        </Label>
        <Slider
            id="explanation-slider"
            defaultValue={[explanationLevel]}
            max={100}
            step={1}
            onValueChange={setExplanationLevel}
            className="w-full"
        />
    </div>
  );
}
