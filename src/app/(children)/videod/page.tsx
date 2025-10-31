"use client";

import ReactPlayer from "react-player";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center my-10 md:mt-24 md:mb-20 md:flex-row">
      <div className="flex flex-col items-center justify-center mb-6 md:mr-20 md:mb-0">
        <p className="mb-3 font-sans text-lg text-center md:text-3xl">Karated tutvustav video</p>
        <ReactPlayer
          width="100%"
          style={{ maxWidth: 800 }}
          height={400}
          url="https://www.youtube.com/watch?v=ExANa6rCU38"
          controls
        />
        <div className="mt-10 md:mt-20">
          <p className="mb-3 font-sans text-lg text-center md:text-3xl">
            Karateklubi Nüke 25-juubel
          </p>
          <ReactPlayer
            width="100%"
            style={{ maxWidth: 800 }}
            height={400}
            url="https://www.youtube.com/watch?v=ibuDZAIPOU8"
            controls
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-3 font-sans text-lg text-center md:text-3xl">Nüke Karate</p>
        <ReactPlayer
          width="100%"
          style={{ maxWidth: 800 }}
          height={400}
          url="https://youtu.be/dcwxf5254wQ"
          controls
        />
        <div className="mt-10 md:mt-20">
          <p className="mb-3 font-sans text-lg text-center md:text-3xl">
            Karatelaager Aravetel 1990 aasta suvel
          </p>
          <ReactPlayer
            width="100%"
            style={{ maxWidth: 800 }}
            height={400}
            url="https://youtu.be/oFMdnoZ8aSk"
            controls
          />
        </div>
      </div>
    </div>
  );
}
