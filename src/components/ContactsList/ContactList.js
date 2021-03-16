import { useEffect } from 'react';

import { connect } from 'react-redux'
import { getContacts } from '../../store/contactsReducer'
import { setActiveContact } from '../../store/activeContactReducer'
import { setShowForm } from '../../store/showFormReducer';

import './ContactList.css'

function ContactsList({
  getContacts,
  setActiveContact,
  contacts,
  active,
  setShowForm
}) {
  useEffect(() => {
    getContacts();
  }, [getContacts])

  const handleAddNew = () => {
    setActiveContact({})
    setShowForm(true)
  }

  const handleEditContact = contact => {
    setActiveContact(contact)
    setShowForm(true)
  }

  return (
    <aside>
      <header >
        <h2>Contacts</h2>
        <button
          onClick={handleAddNew}
        >
        <div></div>
        <div></div>
      </button>
      </header>
      {!!contacts.length &&
        <ul>
          {contacts.map((contact, i) =>
            <li
              key={contact.id}
              className={active.id === contact.id ? 'active' : ''}
              onClick={conatct => handleEditContact(contact)}
            >
              {contact.firstName} {contact.lastName}
            </li>
          )}
        </ul>
      }
    </aside>
  )
}

const mapStateToProps = ({ contactsReducer, activeContactReducer }) => ({
  contacts: contactsReducer,
  active: activeContactReducer,
})
const mapDispatchToProps = { getContacts, setActiveContact, setShowForm }

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)