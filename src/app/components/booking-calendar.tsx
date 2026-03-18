import { useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface TimeSlot {
  time: string;
  available: boolean;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const TIME_SLOTS: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
];

const inputStyle = {
  background: '#080C14',
  border: '1px solid #1E2D45',
  color: '#F8FAFC',
  borderRadius: '0.75rem',
  padding: '12px 16px',
  width: '100%',
  fontSize: '14px',
  outline: 'none',
};

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && formData.name && formData.email && formData.service) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      }, 3000);
    }
  };

  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const calendarDates = generateCalendarDates();

  return (
    <div className="rounded-2xl p-8" style={{ background: '#0F1623', border: '1px solid #1E2D45' }}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5" style={{ color: '#C4956A' }} />
              Select a Date
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {calendarDates.map((date, index) => {
                const dayName = DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1];
                const dayNum = date.getDate();
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const isSelected = selectedDate === index;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: isWeekend ? 1 : 1.05 }}
                    whileTap={{ scale: isWeekend ? 1 : 0.95 }}
                    onClick={() => !isWeekend && setSelectedDate(index)}
                    disabled={isWeekend}
                    className="p-2.5 rounded-xl text-center transition-all"
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, #C4956A, #A67850)' : '#080C14',
                      border: isSelected ? 'none' : '1px solid #1E2D45',
                      color: isWeekend ? '#1E2D45' : isSelected ? '#080C14' : '#94A3B8',
                      cursor: isWeekend ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <div className="text-xs font-medium">{dayName}</div>
                    <div className="text-base font-bold mt-0.5">{dayNum}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {selectedDate !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" style={{ color: '#C4956A' }} />
                Select a Time
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: slot.available ? 1.03 : 1 }}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className="p-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: selectedTime === slot.time ? 'linear-gradient(135deg, #C4956A, #A67850)' : '#080C14',
                      border: selectedTime === slot.time ? 'none' : '1px solid #1E2D45',
                      color: !slot.available ? '#1E2D45' : selectedTime === slot.time ? '#080C14' : '#94A3B8',
                      cursor: !slot.available ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Your Details</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name', required: true },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@company.com', required: true },
              { label: 'Company', key: 'company', type: 'text', placeholder: 'Your company', required: false },
            ].map(({ label, key, type, placeholder, required }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                  {label} {required && <span style={{ color: '#C4956A' }}>*</span>}
                </label>
                <input
                  type={type}
                  required={required}
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={placeholder}
                  style={inputStyle}
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                Service <span style={{ color: '#C4956A' }}>*</span>
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                style={{ ...inputStyle, appearance: 'none' }}
              >
                <option value="" style={{ background: '#0F1623' }}>Select a service</option>
                <option value="ai-integration" style={{ background: '#0F1623' }}>AI Integration</option>
                <option value="lead-campaigns" style={{ background: '#0F1623' }}>Lead Generation</option>
                <option value="website-optimization" style={{ background: '#0F1623' }}>Website Optimization</option>
                <option value="ads-management" style={{ background: '#0F1623' }}>Ads Management</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                placeholder="Tell us about your project..."
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: selectedDate && selectedTime
                  ? 'linear-gradient(135deg, #C4956A, #A67850)'
                  : '#1E2D45',
                color: selectedDate && selectedTime ? '#080C14' : '#64748B',
                cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                boxShadow: selectedDate && selectedTime ? '0 0 20px rgba(196,149,106,0.2)' : 'none',
              }}
            >
              {isSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Booking Confirmed!
                </span>
              ) : (
                'Schedule Consultation'
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
