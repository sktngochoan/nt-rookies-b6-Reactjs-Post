import React, {useState} from 'react';

export const PostContext = React.createContext({
  crudSuccess: false,
  setCrudStatus: () => {}
});

export const PostContextProvider = (props) => {
  const [crudSuccess, setCrudSuccess] = useState(false);

  const setCrudStatus = (val) => {
    setCrudSuccess(val);
  };

  return (
    <PostContext.Provider value={{ crudSuccess, setCrudStatus }}>
      {React.Children.toArray(props.children)}
    </PostContext.Provider>
  );
};
