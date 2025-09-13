'use client';

import React from 'react';
import { useScheduleStore, TimeSlot } from '@/store/schedule';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);

interface ScheduleGridProps {
  onSlotClick?: (day: string, time: string) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ onSlotClick }) => {
  const { timeSlots, setSelectedSlot } = useScheduleStore();

  const getTimeSlotForCell = (day: string, time: string): TimeSlot | null => {
    return timeSlots.find(slot => {
      if (slot.day !== day) return false;
      
      const cellTime = new Date(`2000-01-01T${time}:00`);
      const startTime = new Date(`2000-01-01T${slot.startTime}:00`);
      const endTime = new Date(`2000-01-01T${slot.endTime}:00`);
      
      return cellTime >= startTime && cellTime < endTime;
    }) || null;
  };

  const handleCellClick = (day: string, time: string) => {
    const existingSlot = getTimeSlotForCell(day, time);
    if (existingSlot) {
      setSelectedSlot(existingSlot);
    } else if (onSlotClick) {
      onSlotClick(day, time);
    }
  };

  const getSlotHeight = (slot: TimeSlot): number => {
    const start = new Date(`2000-01-01T${slot.startTime}:00`);
    const end = new Date(`2000-01-01T${slot.endTime}:00`);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return duration * 60; // 60px per hour
  };

  const getSlotTop = (slot: TimeSlot): number => {
    const start = new Date(`2000-01-01T${slot.startTime}:00`);
    const hours = start.getHours() + start.getMinutes() / 60;
    return hours * 60; // 60px per hour
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 border-b bg-gray-50">
        <div className="p-3 text-sm font-medium text-gray-900 border-r">Time</div>
        {DAY_LABELS.map((day) => (
          <div key={day} className="p-3 text-sm font-medium text-gray-900 text-center border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="relative">
        <div className="grid grid-cols-8">
          {/* Time Column */}
          <div className="border-r">
            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="h-15 border-b text-xs text-gray-500 p-2 flex items-center justify-center"
                style={{ height: '60px' }}
              >
                {time}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {DAYS.map((day) => (
            <div key={day} className="relative border-r last:border-r-0">
              {/* Background grid cells */}
              {TIME_SLOTS.map((time) => (
                <div
                  key={`${day}-${time}`}
                  className="h-15 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ height: '60px' }}
                  onClick={() => handleCellClick(day, time)}
                />
              ))}

              {/* Time slot overlays */}
              {timeSlots
                .filter(slot => slot.day === day)
                .map((slot) => (
                  <div
                    key={slot.id}
                    className="absolute left-1 right-1 rounded-md p-2 cursor-pointer shadow-sm border-l-4 hover:shadow-md transition-shadow"
                    style={{
                      top: `${getSlotTop(slot)}px`,
                      height: `${getSlotHeight(slot)}px`,
                      backgroundColor: `${slot.color}20`,
                      borderLeftColor: slot.color,
                    }}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {slot.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </div>
                    {slot.description && (
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {slot.description}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
