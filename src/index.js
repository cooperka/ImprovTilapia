import React from 'react';
import { registerRootComponent } from 'expo';

import App from './components/App/component';

function Root() {
  return <App />
}

registerRootComponent(Root);
