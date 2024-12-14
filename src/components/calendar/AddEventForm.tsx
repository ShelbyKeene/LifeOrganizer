import React, { useState } from 'react';
import { CalendarEvent, EventCategory } from '../../types/calendar';

interface AddEventFormProps {
  onAdd: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const AddEventForm: React.FC<AddEventFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<EventCategory>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !startTime || !endDate || !endTime) return;

    const event: Omit<CalendarEvent, 'id'> = {
      title,
      description,
      startDate: new Date(`${startDate}T${startTime}`),
      endDate: new Date(`${endDate}T${endTime}`),
      category,
    };

    onAdd(event);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setCategory('personal');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/90 mb-2 font-light">Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          placeholder="Enter event title..."
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2 font-light">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          placeholder="Enter event description..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/90 mb-2 font-light">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white/90 mb-2 font-light">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/90 mb-2 font-light">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white/90 mb-2 font-light">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/90 mb-2 font-light">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as EventCategory)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="health">Health</option>
          <option value="bills">Bills</option>
          <option value="social">Social</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white font-light hover:bg-white/30 transition-colors"
      >
        Add Event
      </button>
    </form>
  );
};