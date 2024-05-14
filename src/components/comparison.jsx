import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const Comparison = () => {
  const location = useLocation();
  const { previewImage, selectedModel, caption, score, captionData } = location.state || {};
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/graph');
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-auto object-cover" />
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-800 text-lg font-semibold">No Image Uploaded</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-white text-xl mb-6 font-semibold">Models</h2>
              {['densenet', 'inception', 'resnet', 'vgg'].map((model) => (
                <div key={model} className="w-56 h-20 bg-gray-800 rounded-lg shadow-md mb-6 flex justify-center items-center text-white">
                  <p className="text-lg font-semibold">{model}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-white text-xl mb-6 font-semibold">Captions</h2>
              {captionData ? (
                <>
                  {Object.entries(captionData).map(([model, caption]) => (
                    <div key={model} className="w-72 h-20 bg-gray-800 rounded-lg shadow-md mb-4 flex justify-center items-center text-white">
                      <p className="text-md font-semibold">{caption}</p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-72 h-20 bg-gray-800 rounded-lg shadow-md mb-4 flex justify-center items-center text-white">
                  <p className="text-md font-semibold">No Captions Available</p>
                </div>
              )}
            </div>
          </div>

          <div className="fixed bottom-6 right-6">
            <button
              className="bg-green-500 text-white rounded-full p-4 flex items-center justify-center space-x-2 shadow-lg hover:bg-green-600 transition duration-300"
              onClick={handleRedirect}
            >
              <span>Graph</span>
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comparison;
