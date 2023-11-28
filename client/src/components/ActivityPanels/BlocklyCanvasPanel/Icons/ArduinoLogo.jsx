import React from 'react';

const ArduinoLogo = ({ setHoverCompile, handleCompile, showMenuIcons }) => {
  return (
    <div>
    {showMenuIcons && (
    <div>
      <svg
        version='1.0'
        xmlns='http://www.w3.org/2000/svg'
        width='40px'
        height='20px'
        align='center'
        viewBox='450 280 300 300'
        preserveAspectRatio='xMidYMid'
        onMouseEnter={() => setHoverCompile(true)}
        onMouseLeave={() => setHoverCompile(false)}
        className='hvr-info'
        onClick={handleCompile}
      >
        <metadata>
          Created by potrace 1.10, written by Peter Selinger 2001-2011
        </metadata>
        <g
          transform='matrix(0.1, 0, 0, -0.1, 0, 1200)'
          fill='#000000'
          stroke='none'
        >
          <path d='M5087 8435 c-402 -76 -715 -349 -821 -716 -82 -283 -38 -600 116 -834 119 -182 308 -325 527 -400 238 -81 536 -75 782 15 231 84 467 265 619 473 30 42 57 76 61 76 3 1 23 -25 46 -56 372 -525 992 -713 1508 -459 205 101 359 253 455 451 79 161 95 237 95 445 0 202 -16 278 -90 435 -229 488 -821 709 -1345 503 -103 -40 -208 -100 -299 -169 -94 -71 -253 -234 -319 -329 l-49 -70 -36 53 c-187 283 -473 491 -780 568 -110 28 -358 35 -470 14z m373 -371 c90 -23 240 -94 320 -154 129 -95 265 -256 349 -410 l39 -73 -29 -50 c-187 -316 -439 -514 -728 -573 -112 -22 -278 -15 -371 16 -269 90 -429 316 -430 607 -1 345 216 594 570 657 47 9 215 -3 280 -20z m2160 0 c36 -8 103 -33 150 -56 68 -32 102 -57 167 -123 129 -128 183 -262 183 -450 0 -118 -18 -202 -61 -288 -211 -421 -804 -477 -1197 -112 -79 73 -174 199 -231 307 l-44 84 41 82 c142 285 378 490 636 553 91 23 268 24 356 3z' />
          <path d='M5004 7527 c-3 -8 -4 -54 -2 -103 l3 -89 318 -3 317 -2 0 105 0 105 -315 0 c-253 0 -317 -3 -321 -13z' />
          <path d='M7310 7655 l0 -105 -110 0 -110 0 0 -110 0 -110 110 0 110 0 0 -100 0 -100 105 0 105 0 0 100 0 100 105 0 105 0 0 110 0 110 -105 0 -105 0 0 105 0 105 -105 0 -105 0 0 -105z' />
        </g>
      </svg>
    </div>
    )}
    </div>
  );
};

export default ArduinoLogo;
