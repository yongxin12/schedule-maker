'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ScheduleGrid } from '@/components/schedule/ScheduleGrid';
import { TimeSlotForm } from '@/components/schedule/TimeSlotForm';
import { Button } from '@/components/ui/Button';
import { useScheduleStore } from '@/store/schedule';
import { useAuthStore } from '@/store/auth';

export default function DashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState<{ day: string; time: string } | null>(null);
  const { selectedSlot, setSelectedSlot, timeSlots, clearSchedule } = useScheduleStore();
  const { user } = useAuthStore();

  const handleSlotClick = (day: string, time: string) => {
    setFormInitialData({ day, time });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setFormInitialData(null);
    setSelectedSlot(null);
  };

  const handleEditSlot = () => {
    if (selectedSlot) {
      setIsFormOpen(true);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your weekly schedule and stay organized.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Time Slot</span>
              </Button>
              {timeSlots.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearSchedule}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear Schedule
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Time Slots</p>
                <p className="text-2xl font-bold text-gray-900">{timeSlots.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Days Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(timeSlots.map(slot => slot.day)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Weekly Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {timeSlots.reduce((total, slot) => {
                    const start = new Date(`2000-01-01T${slot.startTime}:00`);
                    const end = new Date(`2000-01-01T${slot.endTime}:00`);
                    return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                  }, 0).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Slot Info */}
        {selectedSlot && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-blue-900">{selectedSlot.title}</h3>
                <p className="text-blue-700 text-sm">
                  {selectedSlot.day.charAt(0).toUpperCase() + selectedSlot.day.slice(1)} • {selectedSlot.startTime} - {selectedSlot.endTime}
                </p>
                {selectedSlot.description && (
                  <p className="text-blue-600 text-sm mt-1">{selectedSlot.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEditSlot}>
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setSelectedSlot(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Grid */}
        <div className="bg-white rounded-lg shadow">
          {timeSlots.length === 0 ? (
            <div className="text-center py-12">
              <Plus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No schedule yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first time slot.</p>
              <Button onClick={() => setIsFormOpen(true)}>
                Add Your First Time Slot
              </Button>
            </div>
          ) : (
            <ScheduleGrid onSlotClick={handleSlotClick} />
          )}
        </div>

        {/* Time Slot Form Modal */}
        <TimeSlotForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          initialData={formInitialData}
          editingSlot={selectedSlot}
        />
      </div>
    </ProtectedRoute>
  );
}
