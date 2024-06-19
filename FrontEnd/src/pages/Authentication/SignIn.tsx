import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/Header-NotConnected.tsx';
import axios from 'axios';
import Alerts from '../../components/Alerts/AlertsComponent.tsx';
import API_URL from '../../components/customenv';


const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null); // State to hold alert information
  const navigate = useNavigate();
  let alertTimeout: NodeJS.Timeout;

  const clearAlert = () => {
    setAlert(null); // Function to clear the alert
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // To prevent page reload
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ username, password });

      const response = await axios.post(`${API_URL}/api/login`, body, config);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      setAlert({
        type: 'success',
        title: 'Connexion réussie',
        description: 'Vous serez redirigé vers le calendrier.',
      });

      setTimeout(() => {
        navigate('/calendar', { replace: true });
      }, 2000);

    } catch (error) {
      setAlert({
        type: 'warning',
        title: 'Échec de la connexion',
        description: 'Vérifiez vos identifiants et réessayez.',
      });
    }
  };

  useEffect(() => {
    if (alert) {
      // Set a timeout to clear the alert after 5 seconds
      alertTimeout = setTimeout(clearAlert, 3000);
    }
    return () => {
      // Clear the timeout when the component is unmounted
      clearTimeout(alertTimeout);
    };
  }, [alert]); // The effect depends on the alert state

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Se connecter" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Connectez-vous à DailyPlanify
            </h2>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Se connecter"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              {alert && (
                <Alerts
                  type={alert.type}
                  title={alert.title}
                  description={alert.description}
                />
              )}

              <div className="mt-6 text-center">
                <p>
                  Pas encore de compte?{' '}
                  <Link to="/auth/signup" className="text-primary">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
