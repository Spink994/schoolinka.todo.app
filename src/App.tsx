import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
]);

function App() {
	return (
		<Suspense fallback={null}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
