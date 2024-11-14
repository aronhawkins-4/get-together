import { create } from 'zustand';
import { Tables } from '../types/supabase.types';
import { persist } from 'zustand/middleware';

type EventsStoreState = {
  events: Tables<'Events'>[];
};
type EventsStoreActions = {
  addEvent: (event: Tables<'Events'>) => void;
  removeEvent: (eventId: number) => void;
  setEvents: (events: Tables<'Events'>[]) => void;
  updateEvent: (event: Tables<'Events'>) => void;
  clearEvents: () => void;
};

type EventsStore = EventsStoreState & EventsStoreActions;

export const useEventsStore = create<EventsStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      removeEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((event) => {
            return event.id !== eventId;
          }),
        })),
      setEvents: (events) => set({ events: events }),
      updateEvent: (event) =>
        set((state) => ({
          events: state.events.map((stateEvent) => {
            if (stateEvent.id === event.id) {
              return event;
            }
            return stateEvent;
          }),
        })),
      clearEvents: () => set({ events: [] }),
    }),
    {
      name: 'events-storage',
    }
  )
);