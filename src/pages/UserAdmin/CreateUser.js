import React from "react";

export default function index() {
  return (
    <div className="pt-48">
      <div className="wrapper grid grid-rows-2 max-w-5xl container mx-auto">
        <div className="first-row grid grid-cols-12">
          <div className="left-content mx-4 flex flex-col justify-center items-center col-span-6 border border-4 border-solid rounded-lg">
            <svg
              className="icon mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              JPG, JPEG up to 10MB
            </p>
          </div>

          <div className="right-content col-span-6 mx-4">
            <div className="nik-nama grid grid-cols-6">
              <div class="col-span-3 pr-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  NIP
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-3 pl-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jabatan
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="col-span-6 mt-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="street-address"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div class="col-span-6 mt-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="first-name"
                id="first-name"
                autoComplete="email"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div class="col-span-6 mt-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 "
              >
                Password
              </label>
              <input
                type="password"
                name="first-name"
                id="first-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div class="col-span-6 mt-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 "
              >
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="second-row grid grid-cols-2 h-auto">
          <div className="first-col"></div>
          <div className="second-col">
            <div className="mt-8 rounded text-center">
              <button
                className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}