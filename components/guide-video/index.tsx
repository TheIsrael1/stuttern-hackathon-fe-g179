'use client';

import React from 'react';
// import ReactPlayer from 'react-player';

const GuideVideo = () => {
  return (
    <div className="px-container-base w-full h-[15rem] max-w-full md:max-w-[27.9375rem] relative">
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" width={'100%'} /> */}
      <iframe
        src="https://www.loom.com/embed/495e3a6079ee4df28ab03f9e1f0ef8f0?sid=e5e4b5ca-99da-4792-9750-9afcce24a866"
        frameBorder="0"
        allowFullScreen
        className=" w-full h-full"
      ></iframe>
    </div>
  );
};

export default GuideVideo;
