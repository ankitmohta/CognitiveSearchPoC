import * as React from 'react';
import { IconButton } from 'react-uwp';
import * as Style from './style';

interface IView {
    component: JSX.Element,
    display: string,
    icon: string | JSX.Element,
}

interface IMainProps {
    display: string,
    onClick: (d: string) => (e: any) => void,
    open: boolean,
    views: IView[],
}

const Main: React.SFC<IMainProps> = ({display, onClick, open, views}) => {
    const buttonStyle: React.CSSProperties = Style.buttonStyle;
    const mainContainer: React.CSSProperties = Style.mainContainer(open);
    const tools: React.CSSProperties = Style.tools;
  return (
      <>
    <span style={tools}>
    {
        views.map(v => <IconButton key={v.display} style={buttonStyle} onClick={onClick(v.display)}>
            {v.icon}
        </IconButton>)
    }
    </span>
    <div style={mainContainer}>
    {
        views.map(v => display === v.display && v.component)
    }
    </div>
      </>
  );
};

export default Main;