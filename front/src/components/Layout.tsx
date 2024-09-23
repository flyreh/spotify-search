import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='flex min-h-screen space-y-6  bg-gray-900'>
            <main className='w-full flex-1 flex-col overflow-hidden'>
                <Outlet />
            </main>
        </div>

    )
}

export default Layout