import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';

const ContactList = ({ contactArr, handleDelete }) => {
  return (
    <ol className={css.list}>
      {contactArr.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            <p>
              {name}: {number}
            </p>

            <button
              className={css.button}
              type="button"
              onClick={() => handleDelete(id)}
            >
              <RiDeleteBinLine height="30px" width="30px" />
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default ContactList;

ContactList.propTypes = {
  contactArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  handleDelete: PropTypes.func,
};
