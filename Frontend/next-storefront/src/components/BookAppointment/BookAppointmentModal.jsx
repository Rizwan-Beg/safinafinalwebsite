"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BookAppointment from './BookAppointment';

const BookAppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-[#000000]/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="relative bg-[#ffffff] w-full max-w-2xl max-h-[90vh] flex flex-col rounded-none shadow-2xl border border-[#e5e7eb] z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 bg-[#ffffff] border-b border-[#e5e7eb] px-8 py-6 flex items-center justify-between shrink-0">
              <h2 className="text-2xl font-serif text-[#171717]">Virtual Consultation</h2>
              <button
                onClick={onClose}
                className="text-[#696969] hover:text-[#7A0C13] transition-colors p-2 hover:bg-[#F5E1E3] rounded-full"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto grow">
              <BookAppointment onSuccess={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookAppointmentModal;