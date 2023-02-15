import React, {useMemo} from 'react';

export const RE_DIGIT = new RegExp(/^\d+$/);
export default function OtpInput({value, valueLength, onChange}) {

    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target) => {
        const nextElementSibling =
            target.nextElementSibling

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target) => {
        const previousElementSibling =
            target.previousElementSibling

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnChange = (
        e,
        idx
    ) => {
        const target = e.target;
        let targetValue = target.value;
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        const targetValueLength = targetValue.length;

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }
        const nextInputEl = target.nextElementSibling
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const newValue =
            value.substring(0, idx) + targetValue + value.substring(idx + 1);

        onChange(newValue);

        if (!isTargetValueDigit) {
            return;
        }
        if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
            return
        }
        focusToNextInput(target)
    };

    const inputOnKeyDown = (e) => {
        const { key } = e;
        const target = e.target
        const targetValue = target.value

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        target.setSelectionRange(0, targetValue.length);
        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }

        focusToPrevInput(target)
    };

    const inputOnFocus = (e) => {
        const {target} = e;
        const prevInputEl =
            target.previousElementSibling

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };
    return (
        <div className="otp-group">
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>
    );
}