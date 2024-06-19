import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import DefaultLayout from '../../layout/Header-NotConnected.tsx';

const Landing: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accueil" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">Bienvenue sur DailyPlanify</h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
          Organisez vos journées efficacement avec DailyPlanify. Téléchargez maintenant pour Windows et commencez à planifier votre succès !
        </p>
        <div className="flex justify-center">
          <a href="/src-tauri/target/x86_64-pc-windows-msvc/release/bundle/nsis/dailyplanify_1.0.1_x64-setup.exe" download>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              Télécharger pour Windows
            </button>
          </a>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Landing;