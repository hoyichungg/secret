import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import './CustomInputNumber.css';

function CustomInputNumber({ min, max, step, name, value, disabled = false, onChange, onBlur }) {
    const [pressTimer, setPressTimer] = useState(null);

    useEffect(() => {
        if (value <= min || value >= max) {
            clearTimers();
        }
    }, [value, min, max]);

    const valueRef = useRef(value);
    valueRef.current = value;

    const clearTimers = useCallback(() => {
        if (pressTimer) {
            clearInterval(pressTimer);
            setPressTimer(null);
        }
    }, [pressTimer]);

    const updateValue = useCallback((increment) => {
        const currentValue = valueRef.current;
        const newValue = increment ? Math.min(max, currentValue + step) : Math.max(min, currentValue - step);
        if (onChange) {
            onChange(newValue);
        }
    }, [max, min, step, onChange]);

    const handleMouseDown = useCallback((increment) => {
        updateValue(increment);
        clearTimers();
        const timer = setInterval(() => {
            updateValue(increment);
        }, 200);
        setPressTimer(timer);
    }, [updateValue, clearTimers]);

    const handleMouseUp = useCallback(() => {
        clearTimers();
    }, [clearTimers]);

    return (
        <div className="custom-input-number">
            <button
                onMouseDown={() => handleMouseDown(false)}
                onMouseUp={handleMouseUp}
                disabled={disabled || value <= min}
            >
                -
            </button>
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                name={name}
                value={value||0}
                onChange={(e) => onChange(e.target.valueAsNumber)}
                onBlur={onBlur}
                disabled={disabled}
            />
            <button
                onMouseDown={() => handleMouseDown(true)}
                onMouseUp={handleMouseUp}
                disabled={disabled || value >= max}
            >
                +
            </button>
        </div>
    );
}

export default memo(CustomInputNumber);
