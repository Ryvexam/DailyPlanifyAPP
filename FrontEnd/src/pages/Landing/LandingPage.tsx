import React from 'react';
import DefaultLayout from '../../layout/Header-NotConnected.tsx';

const Landing: React.FC = () => {

  return (
    <DefaultLayout>
      <div className="relative flex items-center justify-center h-screen bg-light-background dark:bg-dark-background bg-cover bg-center">
        <div className="absolute inset-0 bg-white opacity-50 dark:bg-black dark:opacity-50"></div>
        <div className="relative z-10 text-center p-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark opacity-90 dark:opacity-90 ">
          <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">DailyPlanify</h1>
          <p className="text-lg text-gray-600 dark:text-white mb-8">
            Organisez vos journées efficacement avec DailyPlanify. Commencez à planifier votre vie!
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Landing;
