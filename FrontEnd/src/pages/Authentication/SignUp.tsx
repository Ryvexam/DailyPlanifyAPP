import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/Landing.tsx';
import Alerts from '../../components/Alerts/AlertsComponent.tsx';
import API_URL from '../../components/customenv.tsx'; // Composant d'alertes réutilisable

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$/;

  useEffect(() => {
    evaluatePasswordStrength(password);
  }, [password]);

  const evaluatePasswordStrength = (password) => {
    if (password.length < 8) {
      setPasswordStrength('red');
    } else if (!/[A-Z]/.test(password)) {
      setPasswordStrength('orange');
    } else if (!/[0-9]/.test(password)) {
      setPasswordStrength('yellow');
    } else {
      setPasswordStrength('green');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setAlert({
        type: 'error',
        title: 'Erreur',
        description: 'Tous les champs sont obligatoires.',
      });
      setTimeout(() => setAlert(null), 3000); // Efface l'alerte après 3 secondes
      return;
    }

    if (!passwordPattern.test(password)) {
      setAlert({
        type: 'error',
        title: 'Erreur',
        description:
          'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.',
      });
      setTimeout(() => setAlert(null), 3000); // Efface l'alerte après 3 secondes
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        type: 'error',
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
      });
      setTimeout(() => setAlert(null), 3000); // Efface l'alerte après 3 secondes
      return;
    }

    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    };

    try {
      await axios.post(`${API_URL}/api/registration`, body, config);
      setAlert({
        type: 'success',
        title: 'Inscription réussie',
        description: 'Compte créé avec succès !',
      });

      setTimeout(() => {
        navigate('/auth/signin', { replace: true }); // Redirection après un certain délai
      }, 2000); // Attente avant de rediriger

    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Veuillez réessayer.'
        : "Une erreur inconnue s'est produite.";

      setAlert({
        type: 'error',
        title: 'Erreur',
        description: errorMessage,
      });
      setTimeout(() => setAlert(null), 3000); // Efface l'alerte après 3 secondes
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inscription" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            S'inscrire sur DailyPlanify
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Entrez votre email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Mot de passe
              </label>
              <input
                type="password"
                autoComplete={"new-password"}
                placeholder="Entrez votre mot de passe"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-2 w-full h-2 rounded-lg" style={{ background: passwordStrength }} />
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Confirmation du mot de passe
              </label>
              <input
                type="password"
                placeholder="Confirmez votre mot de passe"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-red-600">Les mots de passe ne correspondent pas.</p>
              )}
            </div>

            {/* Affichage de l'alerte après le bouton */}
            {alert && (
              <div className="mb-6">
                <Alerts
                  type={alert.type}
                  title={alert.title}
                  description={alert.description}
                />
              </div>
            )}

            <div className="mb-5">
              <input
                type="submit"
                value="Créer votre compte"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>

            <p className="text-center">
              Vous avez déjà un compte ?{' '}
              <Link to="/auth/signin" className="text-primary">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
