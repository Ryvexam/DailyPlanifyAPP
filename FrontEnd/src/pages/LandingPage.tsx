import React from 'react';
import Breadcrumb from '../../src/components/Breadcrumbs/Breadcrumb.tsx';
import DefaultLayout from '../layout/Landing.tsx';

const Landing: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accueil" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <h1>Salut</h1>
        <a href="/src-tauri/target/x86_64-pc-windows-msvc/release/bundle/nsis/dailyplanify_1.0.0_x64-setup.exe" download>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download for Windows
          </button>
        </a>
      </div>
    </DefaultLayout>
  );
};

export default Landing;
