'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { timeSlotSchema, TimeSlotFormData } from '@/lib/validations';
import { useScheduleStore, TimeSlot } from '@/store/schedule';

interface TimeSlotFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    day: string;
    time: string;
  } | null;
  editingSlot?: TimeSlot | null;
}

const DAY_OPTIONS = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const COLOR_OPTIONS = [
  { value: '#3B82F6', label: 'Blue' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Yellow' },
  { value: '#EF4444', label: 'Red' },
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#06B6D4', label: 'Cyan' },
  { value: '#84CC16', label: 'Lime' },
  { value: '#F97316', label: 'Orange' },
  { value: '#EC4899', label: 'Pink' },
  { value: '#6366F1', label: 'Indigo' },
];

export const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
  isOpen,
  onClose,
  initialData,
  editingSlot,
}) => {
  const { addTimeSlot, updateTimeSlot, deleteTimeSlot } = useScheduleStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TimeSlotFormData>({
    resolver: zodResolver(timeSlotSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (editingSlot) {
        // Editing existing slot
        setValue('title', editingSlot.title);
        setValue('description', editingSlot.description || '');
        setValue('day', editingSlot.day);
        setValue('startTime', editingSlot.startTime);
        setValue('endTime', editingSlot.endTime);
        setValue('color', editingSlot.color);
      } else if (initialData) {
        // Creating new slot
        setValue('day', initialData.day as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
        setValue('startTime', initialData.time);
        setValue('color', COLOR_OPTIONS[0].value);
        // Set end time to 1 hour later
        const startHour = parseInt(initialData.time.split(':')[0]);
        const endHour = Math.min(startHour + 1, 23);
        setValue('endTime', `${endHour.toString().padStart(2, '0')}:00`);
      }
    } else {
      reset();
    }
  }, [isOpen, initialData, editingSlot, setValue, reset]);

  const onSubmit = (data: TimeSlotFormData) => {
    try {
      if (editingSlot) {
        updateTimeSlot(editingSlot.id, data);
        toast.success('Time slot updated successfully!');
      } else {
        addTimeSlot(data);
        toast.success('Time slot added successfully!');
      }
      onClose();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = () => {
    if (editingSlot) {
      deleteTimeSlot(editingSlot.id);
      toast.success('Time slot deleted successfully!');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingSlot ? 'Edit Time Slot' : 'Add Time Slot'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            label="Title"
            placeholder="Enter activity title"
            error={errors.title?.message}
            {...register('title')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter activity description (optional)"
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <Select
            label="Day"
            options={DAY_OPTIONS}
            placeholder="Select a day"
            error={errors.day?.message}
            {...register('day')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Time"
              type="time"
              error={errors.startTime?.message}
              {...register('startTime')}
            />

            <Input
              label="End Time"
              type="time"
              error={errors.endTime?.message}
              {...register('endTime')}
            />
          </div>

          <Select
            label="Color"
            options={COLOR_OPTIONS}
            error={errors.color?.message}
            {...register('color')}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingSlot ? 'Update' : 'Add'} Time Slot
            </Button>
            
            {editingSlot && (
              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                className="px-4"
              >
                Delete
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
