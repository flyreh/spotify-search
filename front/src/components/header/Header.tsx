import { NavLink } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Header.css"


const Header = () => {


    const handleSignIn = () => {
        window.location.href = 'https://spotify-search-api-seven.vercel.app/api/auth/login';
    }

    return (
        <Container>
            <Navbar expand="lg" className='flex justify-around items-center bg-slate-600/80 border-b-4 border-green-300/80 h-[65px]'>

                <Navbar.Brand href="/" className='flex space-x-2 items-center '>
                    <svg className="text-green-300/80" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" /></svg>
                    <p className='text-lg font-bold font-sans hover:text-yellow-50 transition-colors duration-300'>SpotifySearch</p>
                </Navbar.Brand>


                <Nav
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavLink to="/" className="mx-5 font-bold transition-all duration-200 hover:text-yellow-50" >Artistas</NavLink>
                    <NavLink to="/Recommendations" className="mx-5 font-bold transition-all duration-200 hover:text-yellow-50">Recomendaciones</NavLink>
                    <button onClick={handleSignIn}
                        className="px-3 py-1 ms-5 bg-gray-400 text-black font-semibold rounded border-2
                         border-black hover:bg-green-300/60 transition-all duration-300 shadow-md hover:shadow-black"
                    >
                        Sign In
                    </button>
                </Nav>



            </Navbar>
        </Container >
    );
};

export default Header;