import PropTypes from 'prop-types';
import { Wrapper, EntryField } from './Filter.styled';

export const Filter = ({ state, onChangeName }) => {
  return (
    <Wrapper>
      <EntryField>Find contacts by name</EntryField>
      <input
        className="mb-[15px] border-2"
        type="text"
        value={state.name}
        onChange={evt => onChangeName(evt.target.value)}
        placeholder="Enter name plz"
      />
    </Wrapper>
  );
};

Filter.propTypes = {
  state: PropTypes.object,
  onChangeName: PropTypes.func,
};
