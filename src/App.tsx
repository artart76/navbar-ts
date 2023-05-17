import React from 'react';
import { MenuMobile } from './components/MenuMobile/MenuMobile';

function App() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<MenuMobile />
		</div>
	);
}

export default App;
