import Logo from '@/assets/logo/logo-dark.png';

export default function ApplicationLogo({ className = '' }) {
    return (
        <img
            src={Logo}
            alt="Application Logo"
            className={`select-none ${className}`}
        />
    );
}
