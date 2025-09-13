import { create } from 'zustand';

export interface TimeSlot {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  title: string;
  description?: string;
  color: string;
}

interface ScheduleState {
  timeSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  isEditing: boolean;
  addTimeSlot: (slot: Omit<TimeSlot, 'id'>) => void;
  updateTimeSlot: (id: string, updates: Partial<TimeSlot>) => void;
  deleteTimeSlot: (id: string) => void;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  setIsEditing: (editing: boolean) => void;
  clearSchedule: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
];

export const useScheduleStore = create<ScheduleState>((set) => ({
  timeSlots: [],
  selectedSlot: null,
  isEditing: false,
  
  addTimeSlot: (slot) => {
    const newSlot: TimeSlot = {
      ...slot,
      id: generateId(),
      color: slot.color || defaultColors[Math.floor(Math.random() * defaultColors.length)],
    };
    set((state) => ({
      timeSlots: [...state.timeSlots, newSlot],
    }));
  },
  
  updateTimeSlot: (id, updates) => {
    set((state) => ({
      timeSlots: state.timeSlots.map((slot) =>
        slot.id === id ? { ...slot, ...updates } : slot
      ),
    }));
  },
  
  deleteTimeSlot: (id) => {
    set((state) => ({
      timeSlots: state.timeSlots.filter((slot) => slot.id !== id),
      selectedSlot: state.selectedSlot?.id === id ? null : state.selectedSlot,
    }));
  },
  
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  
  setIsEditing: (editing) => set({ isEditing: editing }),
  
  clearSchedule: () => set({ timeSlots: [], selectedSlot: null, isEditing: false }),
}));
