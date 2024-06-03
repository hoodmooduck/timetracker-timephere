import "./LinkButton.scss";

interface LinkButtonProps {
  text: string;
  link: string;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <a href={props.link} className="link-button">
      {props.text}
    </a>
  );
};

export default LinkButton;
