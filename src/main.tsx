import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { persistor, store } from '@/redux/app/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
