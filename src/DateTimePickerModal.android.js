import React, { useEffect, useRef, useState, memo } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.date === nextProps.date
  );
};

const DateTimePickerModal = memo(
  ({ date, mode, isVisible, onCancel, onConfirm, onHide, ...otherProps }) => {
    const currentDateRef = useRef(date);
    const [currentMode, setCurrentMode] = useState(null);

    useEffect(() => {
      if (isVisible && currentMode === null) {
        setCurrentMode(mode === 'time' ? 'time' : 'date');
      } else if (!isVisible) {
        setCurrentMode(null);
      }
    }, [isVisible, currentMode, mode]);

    if (!isVisible || !currentMode) {
      return null;
    }

    const handleChange = (event, date) => {
      if (event.type === 'dismissed') {
        onCancel();
        onHide(false);
        return;
      }
      let nextDate = date;
      if (mode === 'datetime') {
        if (currentMode === 'date') {
          setCurrentMode('time');
          currentDateRef.current = new Date(date);
          return;
        } else if (currentMode === 'time') {
          const year = currentDateRef.current.getFullYear();
          const month = currentDateRef.current.getMonth();
          const day = currentDateRef.current.getDate();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          if (otherProps.minimumDate) {
            const minYear = otherProps.minimumDate.getFullYear();
            const minMonth = otherProps.minimumDate.getMonth();
            const minDay = otherProps.minimumDate.getDate();
            const minHours = otherProps.minimumDate.getHours();
            const minMinutes = otherProps.minimumDate.getMinutes();
            if (year === minYear && month === minMonth && day === minDay) {
              if (hours === minHours && minutes < minMinutes) {
                nextDate = new Date(year, month, day, hours, minMinutes);
              }
              if (hours < minHours) {
                nextDate = new Date(year, month, day, minHours, minMinutes);
              }
            } else {
              nextDate = new Date(year, month, day, hours, minutes);
            }
          } else {
            nextDate = new Date(year, month, day, hours, minutes);
          }
        }
      }
      onConfirm(nextDate);
      onHide(true, nextDate);
    };

    return (
      <DateTimePicker
        {...otherProps}
        display="spinner"
        mode={currentMode}
        value={date}
        onChange={handleChange}
      />
    );
  },
  areEqual,
);

DateTimePickerModal.defaultProps = {
  date: new Date(),
  isVisible: false,
  onHide: () => {},
};

export { DateTimePickerModal };
