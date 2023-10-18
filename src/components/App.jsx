import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container, MainText, SecondMainText } from './App.styled';

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

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = contact => {
    if (this.state.contacts.find(el => el.name === contact.name)) {
      Notify.failure('Contact already exists');
    } else {
      Notify.success('Contact ADD');
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, { ...contact, id: nanoid(5) }],
        };
      });
    }
  };

  changeFilter = value => {
    this.setState({
      name: value,
    });
  };

  deleteNumber = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  getVisibleItems = () => {
    const { contacts, name } = this.state;
    // const { name } = this.state;
    if (!name) {
      return contacts;
    }
    return contacts.name(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  render() {
    const visibleItems = this.getVisibleItems();
    return (
      <Container>
        <MainText>Phonebook</MainText>
        <ContactForm addContacts={this.addContacts} />
        <SecondMainText>Contacts</SecondMainText>
        <Filter state={this.state} onChangeName={this.changeFilter} />
        <ContactList state={visibleItems} onDelete={this.deleteNumber} />
      </Container>
    );
  }
}
