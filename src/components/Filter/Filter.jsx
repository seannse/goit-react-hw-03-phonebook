import PropTypes from 'prop-types';
import css from './Filter.module.css';
function Filter({ value, handleFilter }) {
  return (
    <div>
      <label className={css.label}>
        <p className={css.p}>Find contacts by name</p>
        <input
          className={css.input}
          type="text"
          name="search"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={value}
          onChange={handleFilter}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
