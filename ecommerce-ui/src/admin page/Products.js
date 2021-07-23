import React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, NumberField, DateField, NumberInput, ImageInput, ImageField } from 'admin-on-rest';

export const ProductList = (props) => (
    <List {...props }>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="price" />
            <NumberField source="amount" />
            <NumberField source="sold" />
            <NumberField source="rating" />
            <ImageField source="image"/>
            <DateField source="created in" />
            <DateField source="updated in" />
        </Datagrid>
    </List>
);

export const ProductEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextField source="description" />
        <NumberInput source="price" />
        <NumberInput source="amount" />
        <NumberInput source="sold" />
        <NumberInput source="rating" />
        <ImageInput source="image"/>
      </SimpleForm>
    </Edit>
  );

  export const ProductCreate = props => (
    <Create {...props}>
      <SimpleForm>
      <TextInput source="name" />
      <TextInput source="name" />
        <TextField source="description" />
        <NumberInput source="price" />
        <NumberInput source="amount" />
        <NumberInput source="sold" />
        <NumberInput source="rating" />
        <ImageInput source="image"/>
      </SimpleForm>
    </Create>
  );