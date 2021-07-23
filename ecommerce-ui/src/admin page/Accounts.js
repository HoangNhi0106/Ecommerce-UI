import React from 'react';
import { List, Datagrid, TextField, EmailField, NumberField, Edit, SimpleForm, TextInput, Create, NumberInput, DateField } from 'admin-on-rest';

export const AccountList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="username" />
            <EmailField source="email" />
            <NumberField source="phone" />
            <DateField source="created in" />
            <DateField source="updated in" />
        </Datagrid>
    </List>
);

export const AccountEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="fisrtname" />
        <TextInput source="lastname" />
        <TextInput source="email" />
        <NumberInput source="phone" />
      </SimpleForm>
    </Edit>
  );

  export const AccountCreate = props => (
    <Create {...props}>
      <SimpleForm>
      <TextInput source="name" />
        <TextInput source="fisrtname" />
        <TextInput source="lastname" />
        <TextInput source="email" />
        <NumberInput source="phone" />
      </SimpleForm>
    </Create>
  );