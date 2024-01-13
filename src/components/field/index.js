import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Field({label, error, children}) {
  const cn = bem('Field');
  return (
    <div className={cn()}>
      <label className={cn('label')}>{label}</label>
      <div className={cn('input')}>
        {children}
      </div>
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.node,
  error: PropTypes.node,
  children: PropTypes.node,
}

Field.defaultProps = {}

export default memo(Field);
