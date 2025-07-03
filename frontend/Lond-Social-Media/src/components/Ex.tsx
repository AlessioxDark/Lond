import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { distance } from 'framer-motion';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { useTimeoutFn } from 'react-use';
import ImgStory from './post/pages/story/ImgStory';
import StoryPlayer from './post/pages/story/StoryPlayer';
const Ex = () => {
	const [value, setValue] = useState(0);
	const [sliderRange, setSliderRange] = useState();
	const sliderRef = useRef<HTMLInputElement>(null);
	const handleSliderInput = () => {
		if (!sliderRef.current) return;
		const range = 50000 - 0;
		const distance = parseFloat(sliderRef.current.value);
		const percent = (distance / range) * 100;
		setSliderRange(percent);
		setValue(sliderRef.current.value);
	};
	const handleNumberInput = (e) => {
		const newValue = parseInt(e.target.value);
		if (newValue < 0) {
			setValue(0);
			setSliderRange(0);
		} else if (newValue > 50000) {
			setValue(50000);
			setSliderRange(100);
		} else {
			setValue(newValue);
			const range = 50000 - 0;
			const distance = newValue - 0;
			const percent = (distance / range) * 100;
			setSliderRange(percent);
		}
	};
	useEffect(() => {
		handleSliderInput();
	}, [sliderRef]);
	return (
		<div className="w-[95%] h-[95%] pl-52">
			<div className="range-slider">
				<div className="slider-values">
					<small>{0}</small>
					<input
						type="number"
						value={value}
						onInput={handleNumberInput}
						min={0}
						max={50000}
						className="number-input"
						step={50}
					/>
					<small>{50000}</small>
				</div>
				<div className="slider-container">
					<input
						type="range"
						onInput={handleSliderInput}
						value={value}
						className="slider"
						min={0}
						max={50000}
						ref={sliderRef}
						step={50}
					/>
					<div
						className="slider-thumb"
						style={{ left: `calc(${sliderRange}- 0.5em)` }}
					></div>
					<div className="progress" style={{ width: `${sliderRange}%` }}></div>
				</div>
			</div>
		</div>
	);
};

export default Ex;
