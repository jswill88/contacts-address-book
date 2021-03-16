import './App.css'
import ContactsList from  './components/ContactsList/ContactList';
import MainForm from './components/MainForm/MainForm';
import { connect } from 'react-redux'

function App({showForm}) {
  return (
    <div className="App">
      <ContactsList />
      {showForm && <MainForm />}
    </div>
  );
}

const mapStateToProps = state => ({
  showForm: state.showFormReducer,
})

export default connect(mapStateToProps)(App);
