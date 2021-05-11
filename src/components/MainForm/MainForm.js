import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './MainForm.css'
import { updateContact, newContact, deleteContact } from '../../store/contactsReducer';
import { setShowForm } from '../../store/showFormReducer';
import BottomButtonRow from '../BottomButtonRow/BottomButtonRow';

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
  const [editLastname, setEditLastName] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    Array.from(document.querySelectorAll('input')).forEach(input => input.value = '')
    setActive(activeContact)
    setEditFirstName(false)
    setEditLastName(false)
    setAddEmail(false)
    document.addEventListener('keydown', () => {
      setEditFirstName(true)
      setEditLastName(true)
    })
    window.scroll(0, 1000)
    return () => {
      document.removeEventListener('keydown', () => {
        setEditFirstName(true)
        setEditLastName(true)
      })
    }
  }, [activeContact])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (active.id) {
      updateContact(active);
    }
    else {
      newContact(active)
    }
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
    if (
      // https://www.regular-expressions.info/email.html
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(newEmail)
    ) {
      const emails = active.emails ? active.emails : [];
      emails.push(newEmail);
      setActive({
        ...active,
        emails
      })
      setNewEmail('');
      setAddEmail(false);
    } else {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 2000)
    }
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
      <div id="inputRow">
        <div>
          <label>First Name</label>
          {editFirstName || !active.firstName ?
            <input
              name="firstName"
              type="text"
              defaultValue={active.firstName}
              required
              onChange={(e) => setActive({ ...active, firstName: e.target.value })}
              className="nameInput"
            />
            :
            <p
              onMouseEnter={() => setEditFirstName(true)}
              className="nameInput"
            >{active.firstName}</p>
          }
        </div>
        <div>
          <label>Last Name</label>
          {editLastname || !active.lastName ?
            <input
              name="lastName"
              type="text"
              defaultValue={active.lastName}
              required
              onChange={(e) => setActive({ ...active, lastName: e.target.value })}
              className="nameInput"
            />
            :
            <p
              onMouseEnter={() => setEditLastName(true)}
              className="nameInput"
            >{active.lastName}</p>
          }

        </div>
      </div>
      <label>Email</label>
      <ul>
        {active.emails && active.emails.map((email, i) =>

          <li
            key={i}
            className="emails"
          >
            {email}
            <button
              onClick={e => handleDeleteEmail(e, email)}
            >
              <div></div>
            </button>
          </li>
        )}
      </ul>
      <div id="newEmailRow">
        {addEmail ?
          <>
            <input
              type="email"
              className="nameInput"
              onChange={e => setNewEmail(e.target.value)}
            />
            <button

              onClick={handleNewEmailSubmit}
            >
              Add
          </button>
            <button
              onClick={() => setAddEmail(false)}
            >
              X
          </button>
          </>
          :
          <>
            <button
              className="addEmail"
              onClick={() => setAddEmail(true)}
            >
              <div></div>
              <div></div>
            </button>
            <label>add email</label>
          </>
        }
      </div>
      {emailError && <p id="emailError">Please enter a vaild email</p>}
      <BottomButtonRow
        handleDeleteContact={handleDeleteContact}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
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