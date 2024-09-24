import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extraer los tokens de la URL
        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');
        const refreshToken = queryParams.get('refresh_token');
        const expiresIn = queryParams.get('expires_in');

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        console.log('Expires In:', expiresIn);

        if (accessToken && refreshToken) {
            // Guardar tokens en localStorage
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('expires_in', expiresIn || '');

            console.log('Tokens saved in localStorage ' + accessToken + " " + refreshToken + " " + expiresIn);

            // Redirigir a otra página o hacer lo que necesites
            navigate('https://spotify-search-alpha.vercel.app/');
        } else {
            // Manejar errores si los tokens no están presentes
            console.error('Tokens not found in URL');
        }
    }, [navigate]);

    return (
        <div>
            <div className='grid justify-items-center h-[200px]  text-white  '>
                <div className=' animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white'></div>
                <p>Actualizando Credenciales...</p>

            </div>

        </div>

    );
};

export default AuthCallback;