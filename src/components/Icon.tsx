import * as svgIcon from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type IconName = Exclude<keyof typeof svgIcon, 'prefix' | 'fas'>;

export type IconProps = {
	name?: LiteralUnion<IconName>;
	className?: string;
	onClick?: NoopVoid;
};

export function Icon({name, onClick, className}: IconProps) {
	if (!name) return null;

	return (
		<FontAwesomeIcon
			onClick={onClick}
			className={`text-app-neutral-10 ${className}`}
			icon={svgIcon[name as IconName]}
		/>
	);
}

export function Spinner({className}: Pick<IconProps, 'className'>) {
	return (
		<Icon name="faSpinner" className={classNames('animate-spin', className)} />
	);
}
