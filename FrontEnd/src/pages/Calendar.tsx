import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import MonthView from '../components/CalendarComponents/monthView';
import DayView from '../components/CalendarComponents/dayView.tsx';
import ButtonWithSVG from '../components/ButtonwithSVG.tsx';

const Calendar = () => {
  const [viewType, setViewType] = useState('month'); // Permet de changer la vue
  const [selectedDay, setSelectedDay] = useState(new Date());

  const changeViewType = () => {
    setViewType((prevView) => (prevView === 'month' ? 'day' : 'month'));
  };

  const handleDaySelected = (day) => {
    setSelectedDay(day); // Mettre à jour le jour sélectionné
  };

  const handleDoubleClick = () => {
    changeViewType(); // Changer de vue sur double-clic
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendrier" />


      <ButtonWithSVG
        pathD="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
        text={viewType === 'month' ? 'Vue Journalière' : 'Vue Mensuelle'}
        action={changeViewType}
        color="border-primary text-primary"
      />
      <div className="flex justify-center items-center space-x-2 my-4 h-2" />

      {viewType === 'month' ? (
        <MonthView
          onDaySelected={handleDaySelected}
          onDoubleClick={handleDoubleClick}

        />
      ) : (
        <DayView selectedDay={selectedDay} />
      )}
    </DefaultLayout>
  );
};

export default Calendar;
