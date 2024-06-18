import { useState } from 'react';
import { format, addMonths, getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';

const MonthView = ({ onDaySelected, onDoubleClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null); // Move the selectedDay state here

  const changeMonth = (increment) => {
    setCurrentMonth(addMonths(currentMonth, increment));
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDay(selectedDate); // Update the selectedDay state when a day is clicked
    onDaySelected(selectedDate); // Callback to inform about the selected day
  };

  const handleDayDoubleClick = (day) => {
    if (onDoubleClick) {
      onDoubleClick(); // Callback to change the view
    }
    handleDayClick(day); // Call day selection handler
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const startingDay = getDay(startOfMonth(currentMonth));
    const adjustedStartingDay = (startingDay === 0) ? 6 : startingDay - 1;
    const currentDate = new Date();

    // Add empty cells for preceding days
    for (let i = 0; i < adjustedStartingDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelectedDay = selectedDay && day === selectedDay.getDate() && currentMonth.getMonth() === selectedDay.getMonth() && currentMonth.getFullYear() === selectedDay.getFullYear();
      const isToday = day === currentDate.getDate() && currentMonth.getMonth() === currentDate.getMonth() && currentMonth.getFullYear() === currentDate.getFullYear();

      let dayClass = 'ease relative h-16 md:h-20 lg:h-25 xl:h-31 cursor-pointer border p-2 transition duration-500 hover:bg-gray dark:border-strokedark';

      if (isToday) {
        dayClass += ' bg-blue-300 text-white';
      }

      if (isSelectedDay) {
        dayClass += ' bg-green-300 text-white';
      }

      days.push(
        <td
          key={day}
          className={dayClass}
          onClick={() => handleDayClick(day)}
          onDoubleClick={() => handleDayDoubleClick(day)} // Detect double-click
        >
          <span className="font-medium">{day}</span>
        </td>
      );
    }

    return (
      <tbody>
      {[...Array(Math.ceil((days.length) / 7))].map((_, rowIndex) => (
        <tr key={`row-${rowIndex}`} className="grid grid-cols-7">
          {days.slice(rowIndex * 7, (rowIndex + 1) * 7)}
        </tr>
      ))}
      </tbody>
    );
  };

  return (
    <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
        >
          Précédent
        </button>
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl">{`${format(currentMonth, 'MMMM yyyy', { locale: fr })}`}</h2>
        <button
          onClick={() => changeMonth(1)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
        >
          Suivant
        </button>
      </div>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
          <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white text-xs sm:text-sm md:text-base">
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center rounded-tl-sm p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Lundi </span>
              <span className="block lg:hidden"> Lun </span>
            </th>
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Mardi </span>
              <span className="block lg:hidden"> Mar </span>
            </th>
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Mercredi </span>
              <span className="block lg:hidden"> Mer </span>
            </th>
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Jeudi </span>
              <span className="block lg:hidden"> Jeu </span>
            </th>
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Vendredi </span>
              <span className="block lg:hidden"> Ven </span>
            </th>
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Samedi </span>
              <span className="block lg:hidden"> Sam </span>
            </th>
            <th className="flex h-10 sm:h-12 md:h-14 lg:h-15 items-center justify-center rounded-tr-sm p-1 sm:p-2 text-center font-semibold">
              <span className="hidden lg:block"> Dimanche </span>
              <span className="block lg:hidden"> Dim </span>
            </th>
          </tr>
          </thead>
          {renderCalendarDays()}
        </table>
      </div>
    </div>
  );
};

export default MonthView;
