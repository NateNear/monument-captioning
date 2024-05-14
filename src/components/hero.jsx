import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Hero() {
  const heroRef = useRef(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [caption, setCaption] = useState('');
  const [score, setScore] = useState('');
  const [captionData, setCaptionData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const hero = heroRef.current;
    gsap.set(hero, { y: '-100vh' });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        markers: true
      }
    });

    timeline.to(hero, { y: '0%', duration: 1, ease: 'power2.inOut' });
  }, []);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    if (captionData) {
      const { [model + '_caption']: caption, [model + '_score']: score } = captionData;
      setCaption(caption);
      setScore(score);
    } else {
      console.error('No caption data available');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (previewImage) {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.post('https://hot-explicitly-giraffe.ngrok-free.app/upload', {
          image: previewImage
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);

        setCaptionData(response.data);
      } catch (error) {
        console.error('Error uploading image:', error.response.data);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    } else {
      console.error('No image selected');
    }
  };

  const handleRedirect = () => {
    navigate('/comparison', {
      state: {
        previewImage,
        selectedModel,
        caption,
        score,
        captionData
      }
    });
  };

  return (
    <div>
      <div className="bg-gray-900 py-4 pt-20 pb-14">
        <div className="max-w-7xl px-4 text-center">
          <h1 className="text-white text-7xl font-bold">Captioning Based on Given Theme</h1>
        </div>
      </div>
      <div ref={heroRef} className="grid grid-cols-3 h-auto bg-gray-900">
        <div className="p-6 flex flex-col justify-center items-center">
          <label htmlFor="fileUpload" className="bg-indigo-500 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-indigo-600 transition duration-300">Upload Image</label>
          <input id="fileUpload" type="file" className="hidden" onChange={handleFileUpload} />
          <div className="mt-8 w-64 h-64 bg-white rounded-lg shadow-md flex justify-center items-center">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <p className="text-gray-800 text-lg font-semibold">Preview Image</p>
            )}
          </div>
          <div className="p-6 flex flex-col justify-center items-center">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleImageUpload}
            >
              Upload to Server
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-center items-center">
          <div className="w-56 h-20 bg-gray-800 rounded-lg shadow-md mb-6 flex justify-center items-center text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
            <button onClick={() => handleModelSelect('densenet')} className="text-lg font-semibold focus:outline-none">Densenet</button>
          </div>
          <div className="w-56 h-20 bg-gray-800 rounded-lg shadow-md mb-6 flex justify-center items-center text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
            <button onClick={() => handleModelSelect('inception')} className="text-lg font-semibold focus:outline-none">Inceptionnet</button>
          </div>
          <div className="w-56 h-20 bg-gray-800 rounded-lg shadow-md mb-6 flex justify-center items-center text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
            <button onClick={() => handleModelSelect('resnet')} className="text-lg font-semibold focus:outline-none">Resnet</button>
          </div>
          <div className="w-56 h-20 bg-gray-800 rounded-lg shadow-md flex justify-center items-center text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
            <button onClick={() => handleModelSelect('vgg')} className="text-lg font-semibold focus:outline-none">Vgg16</button>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-center items-center">
          <h2 className="text-white text-xl mb-6 font-semibold">Selected Model</h2>
          {selectedModel && (
            <>
              <div className="w-72 h-20 bg-gray-800 rounded-lg shadow-md mb-4 flex justify-center items-center text-white">
                <p className="text-md font-semibold">{caption}</p>
              </div>
              {/* <div className="w-72 h-20 bg-gray-800 rounded-lg shadow-md mb-4 flex justify-center items-center text-white">
                <p className="text-md font-semibold">{score}</p>
              </div> */}
            </>
          )}
          <div className="fixed bottom-6 right-6">
            <button
              className="bg-green-500 text-white rounded-full p-4 flex items-center justify-center space-x-2 shadow-lg hover:bg-green-600 transition duration-300"
              onClick={handleRedirect}
            >
              <span>Go to Comparison</span>
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Generating captions...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
