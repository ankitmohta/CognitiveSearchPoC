import * as React from 'react';
import IconButton from 'react-uwp/IconButton';
import TextBox from 'react-uwp/TextBox';
import * as Style from './style';

interface ISearchBoxProps {
    placeholder?: string,
    value: string,
    onChange: (e: any) => void,
    searchAction: (q: string) => void,
}

const SearchBox: React.SFC<ISearchBoxProps> = ({placeholder, value, onChange, searchAction}) => {
    const onClick=() => searchAction(value);
  return <div style={Style.searchBoxStyle}>
      <TextBox
        defaultValue={value}
        onChange={onChange} 
        placeholder={placeholder}
        style={Style.textBoxStyle}
      >
          <IconButton onClick={onClick} style={Style.searchIconStyle}>Search</IconButton>
      </TextBox>
  </div>;
};

export default SearchBox;