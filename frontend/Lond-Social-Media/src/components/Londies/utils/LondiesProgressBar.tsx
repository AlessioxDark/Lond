import React, { useEffect, useRef, useState } from 'react';
import { useRendersCount } from 'react-use';
interface LondiesProgressBarProps {
	min: number;
	max: number;
	value: number;
	setValue: (value: number) => void;
}
const LondiesProgressBar = ({
	min,
	max,
	value,
	setValue,
}: LondiesProgressBarProps) => {
	const [sliderRange, setSliderRange] = useState<number>(0);
	const sliderRef = useRef<HTMLInputElement>(null);
	const handleSliderInput = () => {
		if (!sliderRef.current) return;
		const range = max - min;
		const distance = parseFloat(sliderRef.current.value);
		const percent = (distance / range) * 100;
		setSliderRange(percent);
		setValue(parseFloat(sliderRef.current.value));
	};
	useEffect(() => {
		if (!sliderRef.current) return;
		const range = max - min;
		const distance = parseFloat(sliderRef.current.value);
		const percent = (distance / range) * 100;
		setSliderRange(percent);
	}, [value]);

	useEffect(() => {
		handleSliderInput();
	}, [sliderRef]);

	return (
		<div className="slider-container">
			<input
				type="range"
				onInput={handleSliderInput}
				onChange={handleSliderInput}
				value={value}
				className="slider"
				min={min}
				max={max}
				ref={sliderRef}
				step={max / 1000}
			/>
			<div
				className="slider-thumb"
				style={{ left: `calc(${sliderRange}- 0.5em)` }}
			></div>
			<div className="progress" style={{ width: `${sliderRange}%` }}></div>
		</div>
	);
};

export default LondiesProgressBar;
