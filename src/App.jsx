import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm, ContactList, Filter } from './components';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contactObj => {
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === contactObj.name.toLowerCase()
      )
    ) {
      Notify.failure(`${contactObj.name} is already in contacts!`);
      return;
    }

    const withIdContact = {
      id: nanoid(),
      ...contactObj,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, withIdContact],
    }));
  };

  handleFilter = ({ target }) => {
    const searchName = target.value.toLowerCase();
    this.setState({ filter: searchName });
  };

  filteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.trim())
    );
  };

  handleDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <Filter handleFilter={this.handleFilter} value={filter} />
        <h2>Contacts</h2>
        {contacts.length !== 0 ? (
          <ContactList
            handleDelete={this.handleDelete}
            contactArr={this.filteredContacts()}
          />
        ) : (
          <p>Your contacts list is empty</p>
        )}
      </div>
    );
  }
}
