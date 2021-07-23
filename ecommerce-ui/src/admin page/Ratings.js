import React from 'react';
import { List, TextField, NumberField, DateField, Datagrid} from 'admin-on-rest';

export const RatingList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
        <TextField source="id" />
            <TextField source="product id" />
            <TextField source="account id" />
            <NumberField source="star"/>
            <DateField source="date" />
        </Datagrid>
    </List>
);