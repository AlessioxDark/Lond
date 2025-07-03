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
	return (
		<div className="w-[95%] h-[95%] pl-52 ">
			<div className="w-32 h-32 bg-lond-gray">
				<p className="text-lond-dark">ciao</p>
			</div>
			<div className="w-32 h-32 bg-lond-gray"></div>
		</div>
	);
};

export default Ex;
