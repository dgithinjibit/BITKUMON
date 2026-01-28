
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockModules } from './mockData.js';

export const useLearningStore = create(
  persist(
    (set, get) => ({
      userProfile: {
        background: null,
        goals: [],
      },
      isOnboarded: false,
      unlockedModules: ['m1'],
      completedLessons: {},
      securityScore: 15,
      explanationLevel: 50, // 0-100, maps to ELI5, Normal, Expert
      
      setOnboardingData: (data) => set((state) => {
        // Simple logic to adjust score and unlocked modules based on onboarding
        let newScore = state.securityScore;
        if (data.background === 'Developer') newScore += 15;
        if (data.background === 'Investor') newScore += 10;
        if (data.quizScore > 1) newScore += data.quizScore * 5;

        return {
          userProfile: { background: data.background, goals: data.goals },
          securityScore: Math.min(100, newScore),
          isOnboarded: true,
        };
      }),

      setExplanationLevel: (level) => set({ explanationLevel: level[0] }),

      completeLesson: (lessonId, quizScore) => set((state) => {
        const currentModuleId = mockModules.find(m => m.lessons.some(l => l.id === lessonId))?.id;
        const currentModule = mockModules.find(m => m.id === currentModuleId);
        const nextModuleIndex = mockModules.findIndex(m => m.id === currentModuleId) + 1;
        
        let newUnlockedModules = [...state.unlockedModules];
        if (quizScore >= 0.9 && nextModuleIndex < mockModules.length) {
            const nextModuleId = mockModules[nextModuleIndex].id;
            if (!newUnlockedModules.includes(nextModuleId)) {
                newUnlockedModules.push(nextModuleId);
            }
        }
        
        const scoreIncrease = quizScore >= 0.9 ? 10 : 2;
        
        return {
          completedLessons: { ...state.completedLessons, [lessonId]: quizScore },
          securityScore: Math.min(100, state.securityScore + scoreIncrease),
          unlockedModules: newUnlockedModules,
        };
      }),

      resetProgress: () => set({
        userProfile: { background: null, goals: [] },
        isOnboarded: false,
        unlockedModules: ['m1'],
        completedLessons: {},
        securityScore: 15,
        explanationLevel: 50,
      })
    }),
    {
      name: 'bitkumon-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
