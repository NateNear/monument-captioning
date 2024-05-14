import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

function Quote() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Transition
        show={isLoaded}
        enter="transition-opacity duration-1000 ease-in"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <section className="min-h-screen bg-transparent flex justify-center items-center">
          <div className="text-left">
            <h1 className="text-extrabold text-7xl pb-20">Captioning Based on Given Theme</h1>
            <p className="text-4xl font-bold mb-8 text-gray-800">Team Members</p>
            <div className="ml-20">
              <p className="text-xl mb-4 text-gray-700 font-semibold">A HARINDRA REDDY - 1DS20IS001</p>
              <p className="text-xl mb-4 text-gray-700 font-semibold">ARYAN SINGH CHAUHAN - 1DS20IS021</p>
              <p className="text-xl mb-4 text-gray-700 font-semibold">GOUTHAM B - 1DS20IS036</p>
              <p className="text-xl mb-4 text-gray-700 font-semibold">KARTHIK M CHIPPALAKATTI - 1DS20IS043</p>
              <p className="text-2xl text-gray-700 font-semibold ml-44">GUIDE - Prof. PRAVEEN N</p>
            </div>
          </div>
        </section>
      </Transition>
    </>
  );
}

export default Quote;