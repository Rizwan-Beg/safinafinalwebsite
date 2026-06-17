"use client";
// FILE: Frontend/website/src/components/BookAppointment/Calendar.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ availableDates, selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Convert available dates to Date objects for easier comparison
  const availableDateObjects = availableDates.map(date => new Date(date));
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get the first day of the month and number of days
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };
  
  const isDateAvailable = (day) => {
    if (!day) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return availableDateObjects.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };
  
  const isDateSelected = (day) => {
    if (!day || !selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const selected = new Date(selectedDate);
    return date.toDateString() === selected.toDateString();
  };
  
  const handleDateClick = (day) => {
    if (!day || !isDateAvailable(day)) return;
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    onDateSelect(dateString);
  };
  
  const isPastMonth = () => {
    const today = new Date();
    return currentMonth.getFullYear() < today.getFullYear() || 
           (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() < today.getMonth());
  };
  
  const isFutureMonth = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2); // Allow 2 months ahead
    return currentMonth.getFullYear() > maxDate.getFullYear() || 
           (currentMonth.getFullYear() === maxDate.getFullYear() && currentMonth.getMonth() > maxDate.getMonth());
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          disabled={isPastMonth()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth(1)}
          disabled={isFutureMonth()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const available = isDateAvailable(day);
          const selected = isDateSelected(day);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!available}
              className={`
                h-10 w-10 text-sm rounded-lg transition-all duration-200 flex items-center justify-center
                ${!day ? 'invisible' : ''}
                ${available 
                  ? selected 
                    ? 'bg-red-500 text-white font-semibold shadow-md' 
                    : 'bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-900 border border-gray-200 hover:border-red-200'
                  : 'text-gray-300 cursor-not-allowed'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-50 border border-gray-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;