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

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && formData.name && formData.email && formData.service) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
        });
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
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Calendar className="w-6 h-6 text-primary" />
              Select a Date
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {calendarDates.map((date, index) => {
                const dayName = DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1];
                const dayNum = date.getDate();
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: isWeekend ? 1 : 1.05 }}
                    whileTap={{ scale: isWeekend ? 1 : 0.95 }}
                    onClick={() => !isWeekend && setSelectedDate(index)}
                    disabled={isWeekend}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isWeekend
                        ? 'bg-muted/30 text-muted-foreground cursor-not-allowed border-muted'
                        : selectedDate === index
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                        : 'bg-white hover:border-primary border-muted'
                    }`}
                  >
                    <div className="text-xs font-medium">{dayName}</div>
                    <div className="text-lg font-bold mt-1">{dayNum}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Clock className="w-6 h-6 text-primary" />
                Select a Time
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((slot, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: slot.available ? 1.05 : 1 }}
                    whileTap={{ scale: slot.available ? 0.95 : 1 }}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      !slot.available
                        ? 'bg-muted/30 text-muted-foreground cursor-not-allowed border-muted'
                        : selectedTime === slot.time
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                        : 'bg-white hover:border-primary border-muted'
                    }`}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Booking Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Your Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-muted rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-muted rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border-2 border-muted rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Service Interested In <span className="text-primary">*</span>
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 border-2 border-muted rounded-lg focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select a service</option>
                <option value="ai-integration">AI Integration</option>
                <option value="lead-campaigns">Lead Campaigns</option>
                <option value="website-optimization">Website Optimization</option>
                <option value="ads-management">Ads Management (Organic & Non-Organic)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-muted rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className={`w-full py-4 rounded-lg font-semibold transition-all ${
                selectedDate && selectedTime
                  ? 'bg-primary text-primary-foreground hover:bg-accent shadow-lg'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {isSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Booking Confirmed!
                </span>
              ) : (
                'Schedule Consultation'
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-secondary/30 border-2 border-primary rounded-lg"
        >
          <div className="flex items-start gap-3">
            <Check className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Booking Confirmed!</h4>
              <p className="text-accent">
                You'll receive a Zoom link at <strong>{formData.email}</strong> shortly. We look forward to speaking with you!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
