import { Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect, useRef, useState } from 'react';

const OptionBox = ({
  options,
  setOptionText,
  selectedOption,
  setSelectedOption,
}) => {
  const [activeOption, setActiveOption] = useState(null);
  const activeOptionRef = useRef();

  useEffect(() => {
    activeOptionRef.current && activeOptionRef.current.select();
  }, [activeOption]);

  const optionElements = options.map((opt) => {
    return activeOption === opt.id ? (
      // 현재 활성화 되어있는 옵션
      <div className="option" key={opt.id}>
        <Checkbox
          className="option-checkbox"
          checked={opt.id === selectedOption}
          onChange={(e) => {
            if (e.target.checked) setSelectedOption(opt.id);
            else setSelectedOption(null);
          }}
        >
          <Input
            size="small"
            className="option-text-field"
            defaultValue={opt.value}
            ref={activeOptionRef}
            onBlur={(e) => {
              setOptionText(opt.id, e.target.value);
              setActiveOption(null);
              activeOptionRef.current = null;
            }}
            onPressEnter={(e) => {
              setOptionText(opt.id, e.target.value);
              setActiveOption(null);
              activeOptionRef.current = null;
            }}
            // ref={activeOptionInputFieldRef}
          />
        </Checkbox>
      </div>
    ) : (
      // 디폴트 옵션
      <div className="option" key={opt.id}>
        <Checkbox
          className="option-checkbox"
          // disabled
          checked={opt.id === selectedOption}
          onChange={(e) => {
            if (e.target.checked) setSelectedOption(opt.id);
            else setSelectedOption(null);
          }}
        >
          <span
            className="option-text"
            onClick={(e) => {
              setActiveOption(opt.id);
              e.preventDefault();
            }}
          >
            {opt.value}
          </span>
        </Checkbox>
      </div>
    );
  });

  return (
    <div className="option-box-container">
      <div className="option-wrapper">
        {optionElements}
        <div className="option"></div>
      </div>
    </div>
  );
};

export default OptionBox;
