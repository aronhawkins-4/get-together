import { create } from 'zustand';
import { Tables } from '../types/supabase.types';
import { persist } from 'zustand/middleware';

type IdeasStoreState = {
  ideas: Tables<'Events'>[];
};
type IdeasStoreActions = {
  addIdea: (ideaName: string, isIdea?: boolean) => void;
  removeIdea: (ideaId: number) => void;
  setIdeas: (ideas: Tables<'Events'>[]) => void;
  clearIdeas: () => void;
};

type IdeasStore = IdeasStoreState & IdeasStoreActions;

export const useIdeasStore = create<IdeasStore>()(
  persist(
    (set) => ({
      ideas: [],
      addIdea: (ideaName) =>
        set((state) => ({
          ideas: [
            ...state.ideas,
            {
              created_at: Date.now().toString(),
              end_datetime: null,
              id: state.ideas[state.ideas.length - 1].id + 1,
              is_idea: true,
              name: ideaName,
              start_datetime: null,
            },
          ],
        })),
      removeIdea: (ideaId) =>
        set((state) => ({
          ideas: state.ideas.filter((idea) => {
            return idea.id !== ideaId;
          }),
        })),
      setIdeas: (ideas) => set({ ideas: ideas }),
      clearIdeas: () => set({ ideas: [] }),
    }),
    {
      name: 'ideas-storage',
    }
  )
);
