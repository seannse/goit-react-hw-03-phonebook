import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm, ContactList, Filter } from './components';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    parsedContacts && this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
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
