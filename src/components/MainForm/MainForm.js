import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './MainForm.css'
import { updateContact, newContact, deleteContact } from '../../store/contactsReducer';
import { setShowForm } from '../../store/showFormReducer';


// validate email
// popup to show success contact added, updated, or deleted

function MainForm({
  activeContact,
  updateContact,
  newContact,
  deleteContact,
  setShowForm,
}) {
  const [active, setActive] = useState(activeContact);
  const [addEmail, setAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastname, setEditLastName] = useState(false)

  useEffect(() => {
    setActive(activeContact)
    setEditFirstName(false)
    setEditLastName(false)
  }, [activeContact])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(active.id) {
      updateContact(active);
    }
    else {
      newContact(active)
    }
    Array.from(document.querySelectorAll('input')).forEach(input => input.value = '')
  }

  const handleDeleteContact = e => {
    e.preventDefault();
    deleteContact(active.id)
  }

  const handleCancel = e => {
    e.preventDefault();
    setShowForm(false);
  }

  const handleNewEmailSubmit = e => {
    e.preventDefault();
    const emails = active.emails ? active.emails : [];
    emails.push(newEmail);
    setActive({
      ...active,
      emails
    })
    setNewEmail('');
    setAddEmail(false);
  }

  const handleDeleteEmail = (e, emailToDelete) => {
    e.preventDefault();
    setActive(contact => ({
      ...contact,
      emails: contact.emails.filter(saved => saved !== emailToDelete)
    }))
  }

  return (
    <form>
      <label>First Name</label>
      {editFirstName || !active.firstName ?
        <input
          name="firstName"
          type="text"
          defaultValue={active.firstName}
          required
          onChange={(e) => setActive({...active, firstName:e.target.value})}
        />
        :
        <p
        onClick={() => setEditFirstName(true)}
        >{active.firstName}</p>
      } 
      <label>Last Name</label>
      {editLastname || !active.lastName ?
        <input
          name="lastName"
          type="text"
          defaultValue={active.lastName}
          required
          onChange={(e) => setActive({...active, lastName: e.target.value})}
        />
        :
        <p
        onClick={() => setEditLastName(true)}
        >{active.lastName}</p>
      } 
      <label>Email</label>
      {active.emails && active.emails.map((email, i) =>
        <li
          key={i}
        >
          {email}
          <button
            onClick={e => handleDeleteEmail(e, email)}
          >-</button>
        </li>
      )}
      {addEmail ?
        <>
          <input
            type="text"
            onChange={e => setNewEmail(e.target.value)}
          />
          <button
            onClick={handleNewEmailSubmit}
          >
            Add
          </button>
        </>
        :
        <>
          <button
            onClick={() => setAddEmail(true)}
          >+</button>
          <label>add email</label>
        </>
      }
      
      <button
        onClick={handleDeleteContact}
      >
        Delete
      </button>
      <button
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
      onClick={handleSubmit}
      >Submit</button>
    </form>
  )
}

const mapStateToProps = state => ({
  activeContact: state.activeContactReducer,
})

export default connect(
  mapStateToProps,
  { updateContact, newContact, deleteContact, setShowForm }
  )(MainForm)