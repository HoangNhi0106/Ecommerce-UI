import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { ProductList } from './admin page/Products'

const App = () => (
    <Admin restClient={jsonServerRestClient('http://localhost:8080')}>
        <Resource name="product" list={ProductList} />
    </Admin>
);

export default App;