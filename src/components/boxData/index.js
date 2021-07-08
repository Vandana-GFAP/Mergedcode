import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import './index.css';

const Boxdata = props => {
  const {
    value = 0,
    setValue = () => {},
    max = 0,
    title = '',
    subtitle = '',
    isDisabled = false,
  } = props;
  const [togglerdaily, setToggled] = useState(false);

  useEffect(() => {
    if (value > 0) {
      setToggled(true);
    }
  }, []);

  return (
    <>
      <div className='box_main_div'>
        <div className='box_div'>
          <div>
            <p className='boxtitle'>{title}</p>
            <p className='boxsubtitle'>{subtitle}</p>
          </div>
          <Switch
            checked={togglerdaily}
            onChange={e => setToggled(e.target.checked)}
            color='primary'
            name='checkedB'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
        {togglerdaily
          ? rangeSelector({ value, setValue, max, isDisabled })
          : null}
      </div>
    </>
  );
};

const rangeSelector = props => {
  const { value = 0, setValue = () => {}, max = 0, isDisabled = false } = props;

  return (
    <>
      <div className='slideBlock'>
        <div className="block-div">
          <div className='track'></div>
          <div
            className='slideProgress'
            style={{
              position: 'relative',
              width: (value / max) * 100 + '%',
            }}
          ></div>
          <input
            type='range'
            onChange={e =>
              setValue(
                e.target.value >= 0 && e.target.value <= 10000
                  ? e.target.value
                  : 0
              )
            }
            value={value}
            name='range'
            min='0'
            max={max}
            disabled={isDisabled}
          />
          <div className='d-flex justify-content-between lower_progress_num'>
            <p>0</p>
            <p>{max}</p>
          </div>
        </div>
        <div>
          ₹
          <input
            onChange={e => setValue(e.target.value <= max ? e.target.value : 0)}
            type='text'
            name='price_prod'
            id='price_prod'
            value={value}
            className='valPrice'
            disabled={isDisabled}
          ></input>
        </div>
      </div>
    </>
  );
};

export default Boxdata;
