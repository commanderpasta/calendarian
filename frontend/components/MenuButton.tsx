import { NavLink } from 'react-router-dom';

interface MenuButtonProps {
    label: string,
    toPath: string,
}

export default function MenuButton(props: MenuButtonProps) {
    return (
        <NavLink className="h-10 mx-2 p-2 border-2-solid rounded-lg text-gray-700 bg-teal-200 hover:bg-teal-300"
            to={props.toPath}>
            {props.label}
        </NavLink>
    );
}