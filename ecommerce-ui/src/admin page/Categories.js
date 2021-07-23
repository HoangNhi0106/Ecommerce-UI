import React from 'react';
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const CategoryList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="created in" />
            <TextField source="updated in" />
        </Datagrid>
    </List>
);

export const CategoryEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="description" />
      </SimpleForm>
    </Edit>
  );

  export const CategoryCreate = props => (
    <Create {...props}>
      <SimpleForm>
      <TextInput source="name" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );