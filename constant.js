
export const TECHS = {
    REACT: 'React',
    EXPRESS: 'Express',
    REACT_EXPRESS: 'React & Express',
    REACT_EXPRESS_MONGO_DB: 'React & Express & MongoDB'
}

export const TECHNOLOGIES = {
    REACT_JS: 'React-JS',
    REACT_TS: 'React-TS',
    REACT_JS_TAILWIND: 'React-JS-tailwind',
    REACT_TS_TAILWIND: 'React-TS-tailwind',
    REACT_JS_S: 'React-JS-s',
    REACT_TS_S: 'React-TS-s',
    REACT_JS_TAILWIND_S: 'React-JS-tailwind-s',
    REACT_TS_TAILWIND_S: 'React-TS-tailwind-s',
    EXPRESS_JS_FUNCTION: 'Express-JS-FUNCTION',
    EXPRESS_JS_CLASS: 'Express-JS-CLASS',
    EXPRESS_TS_FUNCTION: 'Express-TS-FUNCTION',
    EXPRESS_TS_CLASS: 'Express-TS-CLASS',
    REACT_EXPRESS_JS_FUNCTION: 'React-Express-JS-FUNCTION',
    REACT_EXPRESS_JS_CLASS: 'React-Express-JS-CLASS',
    REACT_EXPRESS_TS_FUNCTION: 'React-Express-TS-FUNCTION',
    REACT_EXPRESS_TS_CLASS: 'React-Express-TS-CLASS',
}

export const GITHUB_REPOS = {
    [TECHNOLOGIES.REACT_JS] : 'https://github.com/ReactiveForge/react-js.git',
    [TECHNOLOGIES.REACT_TS] : 'https://github.com/ReactiveForge/react-ts.git',
    [TECHNOLOGIES.REACT_JS_TAILWIND] : 'https://github.com/ReactiveForge/react-js-tailwind.git',
    [TECHNOLOGIES.REACT_TS_TAILWIND] : 'https://github.com/ReactiveForge/react-ts-tailwind.git',
    [TECHNOLOGIES.EXPRESS_JS_FUNCTION] : 'https://github.com/ReactiveForge/express-js-function.git',
    [TECHNOLOGIES.EXPRESS_JS_CLASS] : 'https://github.com/ReactiveForge/express-js-class.git',
    [TECHNOLOGIES.EXPRESS_TS_FUNCTION] : 'https://github.com/ReactiveForge/express-ts-function.git',
    [TECHNOLOGIES.EXPRESS_TS_CLASS] : 'https://github.com/ReactiveForge/express-ts-class.git',
    [TECHNOLOGIES.REACT_JS_S] : 'https://github.com/ReactiveForge/react-js-s.git',
    [TECHNOLOGIES.REACT_TS_S] : 'https://github.com/ReactiveForge/react-ts-s.git',
    [TECHNOLOGIES.REACT_JS_TAILWIND_S] : 'https://github.com/ReactiveForge/react-js-tailwind-s.git',
    [TECHNOLOGIES.REACT_TS_TAILWIND_S] : 'https://github.com/ReactiveForge/react-ts-tailwind-s.git',
};
  
export const PACKAGE_JSON = `{
    "name": "",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "install": "cd client && npm i && cd ../server && npm i",
      "start": "concurrently 'npm run start:client' 'npm run start:server'",
      "start:client": "cd client && npm start",
      "start:server": "cd server && npm start"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  `;
